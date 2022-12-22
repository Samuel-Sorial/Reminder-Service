import { config } from "dotenv";

interface Config {
    PORT: number;
    MESSAGE_BROKER_URL: string;
    DATABASE_URL: string;
    QUEUE_NAME: string;

    INTERVAL_MILLISECONDS: number;
}

config();

const defaultConfig: Config = {
    PORT: 3000,
    MESSAGE_BROKER_URL: "",
    DATABASE_URL: "",
    QUEUE_NAME: "reminder-short-term",
    INTERVAL_MILLISECONDS: 3 * 60 * 1000,
};

export const loadConfig = (): Config => {
    return {
        PORT: process.env.PORT
            ? parseInt(process.env.PORT, 10)
            : defaultConfig.PORT,
        MESSAGE_BROKER_URL:
            process.env.MESSAGE_BROKER_URL || defaultConfig.MESSAGE_BROKER_URL,
        DATABASE_URL: process.env.DATABASE_URL || defaultConfig.DATABASE_URL,
        QUEUE_NAME: process.env.QUEUE_NAME || defaultConfig.QUEUE_NAME,
        INTERVAL_MILLISECONDS: process.env.INTERVAL_MILLISECONDS
            ? Number.parseInt(process.env.INTERVAL_MILLISECONDS, 10)
            : defaultConfig.INTERVAL_MILLISECONDS,
    };
};
