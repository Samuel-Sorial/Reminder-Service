import { createClient, RedisClient } from "redis";
import { Database } from "./database";
import { logger } from "../logger";
export class RedisDatabase implements Database {
    private client: RedisClient | undefined;
    constructor(private url: string) {}

    public startServer(): void {
        if (this.client) {
            return;
        }
        try {
            this.client = createClient({ url: this.url });
            logger.info("Connected successfully to database");
        } catch (error) {
            logger.error(error);
            throw new Error("Can not connect to database");
        }
    }
    public closeServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject();
            }
            this.client.quit((err) => {
                if (err) {
                    return reject();
                }
                logger.info("Closed DB Connection");
                resolve();
            });
        });
    }

    public addToList(listName: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject();
            }
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
            if (!this.client) {
                return reject();
            }
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
            if (!this.client) {
                return reject();
            }
            this.client.del(listName, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
}
