import { Channel, connect, Connection } from "amqplib";
import { logger } from "../logger";

export class MessageBroker {
    private static connection: Connection;
    private static publicChannel: Channel;
    private static assertedEntities: Set<string> = new Set<string>();

    static async connect(connectionString: string) {
        if (!this.connection) {
            try {
                this.connection = await connect(connectionString);
                logger.info("Connected successfully to Message Broker");
            } catch (error) {
                logger.error(error);
                throw new Error("Can not connect to Message Broker!");
            }
        }
    }

    static async closeConnection() {
        await this.connection.close();
        logger.info("Closed Message Broker Connection");
    }

    private static async getPublicChannel() {
        if (!this.publicChannel) {
            this.publicChannel = await this.connection.createChannel();
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
        const connection = this.connection;
        const consumerChannel = await connection.createChannel();
        if (!this.assertedEntities.has(queueName)) {
            await consumerChannel.assertQueue(queueName);
        }
        await consumerChannel.consume(queueName, async (msg) => {
            logger.info("Msg Received");
            if (!msg) {
                return;
            }
            try {
                const content = msg.content.toString();
                await callback(content);
            } catch (error) {
                logger.error(error);
            } finally {
                consumerChannel.ack(msg);
            }
        });
    }
}
