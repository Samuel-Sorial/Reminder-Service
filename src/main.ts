import { WebSocketServer } from "./WebSocket/Server";
import { MessageBroker } from "./MessageBroker/MessageBroker";
import { PORT, MESSAGE_BROKER_CONNECTION } from "./Config/Environment";
import { InstantObserver } from "./Reminder/Observer/InstantObserver";
import { ShortTermObserver } from "./Reminder/Observer/ShortTermObserver";

async function main() {
    if (!MESSAGE_BROKER_CONNECTION) {
        throw new Error(
            "Can not start service without specifying Message Broker connection string."
        );
    }
    await MessageBroker.connect(MESSAGE_BROKER_CONNECTION);
    WebSocketServer.startServer(PORT);
    WebSocketServer.addMessageListener(InstantObserver.onMessage);
    await MessageBroker.consume(
        ShortTermObserver.QUEUE_NAME,
        ShortTermObserver.onMessage
    );

    console.log(`Service started successfully on port ${PORT}`);
}

main();
