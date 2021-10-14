export const PORT: number = process.env.PORT
    ? Number.parseInt(process.env.PORT)
    : 3000;

export const MESSAGE_BROKER_CONNECTION = process.env.MESSAGE_BROKER_CONNECTION;
