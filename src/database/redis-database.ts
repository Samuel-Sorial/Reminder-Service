import { createClient, RedisClient } from "redis";
import { IDatabase } from "./database";
export class RedisDatabase implements IDatabase {
    private client: RedisClient;
    constructor(url: string) {
        try {
            this.client = createClient({ url });
            console.log("Connected successfully to database");
        } catch (error) {
            console.error(error);
            throw new Error("Can not connect to database");
        }
    }

    public closeServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.quit((err, reply) => {
                if (err) {
                    return reject();
                }
                console.log("Closed DB Connection");
                resolve();
            });
        });
    }

    public addToList(listName: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.lpush(listName, value, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    public getListElements(
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

    public removeList(listName: string): Promise<void> {
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
