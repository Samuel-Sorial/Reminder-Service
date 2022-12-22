import { WebSocketServer } from "./websocket/server";
import { MessageBroker } from "./message-broker/message-broker";
import { Database } from "./database/database";
import { InstantObserver } from "./reminder/observer/instant-observer";
import { ShortTermObserver } from "./reminder/observer/short-term-observer";
import { PORT, MESSAGE_BROKER_URL, DATABASE_URL } from "./config/environment";
import { LongTermObserver } from "./reminder/observer/long-term-observer";

async function main() {
    if (!MESSAGE_BROKER_URL) {
        throw new Error(
            "Can not start service without specifying Message Broker connection string."
        );
    }
    if (!DATABASE_URL) {
        throw new Error("Can not start service without specifying DB url.");
    }
    await MessageBroker.connect(MESSAGE_BROKER_URL);
    WebSocketServer.startServer(PORT);
    WebSocketServer.addMessageListener(InstantObserver.onMessage);
    InstantObserver.useEngine(WebSocketServer);
    await MessageBroker.consume(
        ShortTermObserver.QUEUE_NAME,
        ShortTermObserver.onMessage
    );
    ShortTermObserver.useEngine(MessageBroker);
    Database.startServer(DATABASE_URL);
    LongTermObserver.useEngine(Database);
    console.log("Service started successfully!");
}

main();
