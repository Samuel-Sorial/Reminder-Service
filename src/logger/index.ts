import { createLogger, transports } from "winston";

export const logger = createLogger({
    transports: [
        new transports.File({ level: "error", filename: "logs/error.log" }),
        new transports.Console(),
    ],
});
