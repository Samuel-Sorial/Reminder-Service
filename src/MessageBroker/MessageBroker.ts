import { connect, Channel, Connection } from "amqplib";

export class MessageBroker {
    private static connection: Promise<Connection>;
    private static publicChannel: Promise<Channel>;
    private static assertedEntities: Set<string> = new Set<string>();

    static async connect(connectionString: string) {
        if (!this.connection) {
            this.connection = Promise.resolve<Connection>(
                connect(connectionString)
            ).catch((error) => {
                console.error(error);
                throw new Error("Can not connect to MessageBroker!");
            });
        }
    }

    private static async getPublicChannel() {
        if (!this.publicChannel) {
            const connection = await this.connection;
            this.publicChannel = Promise.resolve(connection.createChannel());
        }
        return this.publicChannel;
    }

    private static getDelayedQueueBinding(queueName: string): string {
        return queueName.concat("-delayed");
    }

    private static getDelayedExchangeName(queueName: string): string {
        return queueName.concat("-delayed-exchange");
    }

    private static async assertDelayedExchange(exchangeName: string) {
        const channel = await this.getPublicChannel();
        await channel.assertExchange(exchangeName, "x-delayed-message", {
            durable: true,
            arguments: { "x-delayed-type": "direct" },
        });
    }

    private static async assertDelayedQueue(queueName: string) {
        const channel = await this.getPublicChannel();
        const exchangeName = this.getDelayedExchangeName(queueName);
        const delayedQueueBinding = this.getDelayedQueueBinding(queueName);

        if (!this.assertedEntities.has(exchangeName)) {
            await this.assertDelayedExchange(exchangeName);
            this.assertedEntities.add(exchangeName);
        }
        if (!this.assertedEntities.has(queueName)) {
            await channel.assertQueue(queueName, { durable: true });
            this.assertedEntities.add(queueName);
        }
        if (!this.assertedEntities.has(delayedQueueBinding)) {
            await channel.bindQueue(
                queueName,
                exchangeName,
                delayedQueueBinding
            );
            this.assertedEntities.add(delayedQueueBinding);
        }
    }

    static async delayedPublish(
        msg: string,
        queueName: string,
        delayInMS: number
    ) {
        if (delayInMS < 0) {
            throw new RangeError("Value of delay can not be negative.");
        }
        await this.assertDelayedQueue(queueName);
        const channel = await this.getPublicChannel();
        const delayedExchange = this.getDelayedExchangeName(queueName);
        const delayedQueueBinding = this.getDelayedQueueBinding(queueName);
        channel.publish(
            delayedExchange,
            delayedQueueBinding,
            Buffer.from(msg),
            { headers: { "x-delay": delayInMS } }
        );
    }

    static async consume(queueName: string, callback: (msg: string) => void) {
        if (!this.connection) {
            throw new Error("Can not consume before connecting.");
        }
        const connection = await this.connection;
        const consumerChannel = await connection.createChannel();
        if (!this.assertedEntities.has(queueName)) {
            await consumerChannel.assertQueue(queueName);
        }
        await consumerChannel.consume(queueName, (msg) => {
            if (!msg) {
                return;
            }
            try {
                const content = msg.content.toString();
                callback(content);
            } catch (error) {
                console.error(error);
            } finally {
                consumerChannel.ack(msg);
            }
        });
    }
}
