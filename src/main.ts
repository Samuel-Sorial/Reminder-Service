import { WebSocketServer } from "./WebSocket/Server";
import { MessageBroker } from "./MessageBroker/MessageBroker";
import { Database } from "./Database/Database";
import { InstantObserver } from "./Reminder/Observer/InstantObserver";
import { ShortTermObserver } from "./Reminder/Observer/ShortTermObserver";
import { PORT, MESSAGE_BROKER_URL, DATABASE_URL } from "./Config/Environment";
import { LongTermObserver } from "./Reminder/Observer/LongTermObserver";

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
