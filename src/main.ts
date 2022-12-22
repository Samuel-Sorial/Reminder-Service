import { WebSocketServer } from "./websocket/server";
import { MessageBroker } from "./message-broker/message-broker";
import { RedisDatabase } from "./database";
import { InstantObserver } from "./reminder/observer/instant-observer";
import { ShortTermObserver } from "./reminder/observer/short-term-observer";
import { loadConfig } from "./config";
import { LongTermObserver } from "./reminder/observer/long-term-observer";

async function main() {
    const { PORT, MESSAGE_BROKER_URL, DATABASE_URL } = loadConfig();

    await MessageBroker.connect(MESSAGE_BROKER_URL);

    WebSocketServer.startServer(PORT);
    WebSocketServer.addMessageListener(InstantObserver.onMessage);
    InstantObserver.useEngine(WebSocketServer);

    await MessageBroker.consume(
        ShortTermObserver.QUEUE_NAME,
        ShortTermObserver.onMessage
    );
    ShortTermObserver.useEngine(MessageBroker);

    const db = new RedisDatabase(DATABASE_URL);
    LongTermObserver.useEngine(db);

    console.log("Service started successfully!");
}

main();
