import { createClient, RedisClient } from "redis";

export class Database {
    private static client: RedisClient;

    public static startServer(url: string): void {
        if (!this.client) {
            try {
                this.client = createClient({ url });

                console.log("Connected successfully to Database");
            } catch (error) {
                console.error(error);
                throw new Error("Can not connect to Database");
            }
        }
    }

    public static addToList(listName: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.lpush(listName, value, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    public static getListElements(
        listName: string,
        from?: number,
        to?: number
    ): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.client.lrange(
                listName,
                from || 0,
                to || -1,
                (error, values) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(values);
                }
            );
        });
    }

    public static removeList(listName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.del(listName, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
}
