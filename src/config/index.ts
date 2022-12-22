import { config } from "dotenv";

interface Config {
    PORT: number;
    MESSAGE_BROKER_URL: string;
    DATABASE_URL: string;
}

config();

const defaultConfig : Config = {
    PORT: 3000,
    MESSAGE_BROKER_URL: '',
    DATABASE_URL: ''
} ;

export const loadConfig = (): Config => {
    return {
        PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : defaultConfig.PORT,
        MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL || defaultConfig.MESSAGE_BROKER_URL,
        DATABASE_URL: process.env.DATABASE_URL || defaultConfig.DATABASE_URL,
    };
};

