import { WebSocketServer } from "./websocket/server";
import { MessageBroker } from "./message-broker/message-broker";
import { RedisDatabase } from "./database";
import { InstantObserver } from "./reminder/observer/instant-observer";
import { ShortTermObserver } from "./reminder/observer/short-term-observer";
import { loadConfig } from "./config";
import { LongTermObserver } from "./reminder/observer/long-term-observer";
import { logger } from "./logger";

async function main() {
    const { PORT, MESSAGE_BROKER_URL, DATABASE_URL, QUEUE_NAME } = loadConfig();

    await MessageBroker.connect(MESSAGE_BROKER_URL);

    WebSocketServer.startServer(PORT);
    WebSocketServer.addMessageListener(InstantObserver.onMessage);
    InstantObserver.useEngine(WebSocketServer);

    await MessageBroker.consume(QUEUE_NAME, ShortTermObserver.onMessage);
    ShortTermObserver.useEngine(MessageBroker, QUEUE_NAME);

    const db = new RedisDatabase(DATABASE_URL);
    db.startServer();
    LongTermObserver.useEngine(db);

    logger.info("Service started successfully!");
}

main();
