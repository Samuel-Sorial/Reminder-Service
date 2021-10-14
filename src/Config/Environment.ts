import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
    config();
}

const DEFAULT_PORT = 3000;
export const PORT: number =
    process.env.PORT && process.env.NODE_ENV !== "production"
        ? Number.parseInt(process.env.PORT)
        : DEFAULT_PORT;

export const MESSAGE_BROKER_CONNECTION = process.env.MESSAGE_BROKER_CONNECTION;
