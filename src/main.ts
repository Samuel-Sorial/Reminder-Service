import { WebSocketServer } from "./WebSocket/Server";
import { MessageBroker } from "./MessageBroker/MessageBroker";
import { PORT, MESSAGE_BROKER_CONNECTION } from "./Config/environment";
import { InstantObserver } from "./Reminder/Observer/InstantObserver";
import { ShortTermObserver } from "./Reminder/Observer/ShortTermObserver";

if (!MESSAGE_BROKER_CONNECTION) {
    throw new Error(
        "Can not start service without specifying Message Broker connection string."
    );
}
MessageBroker.connect(MESSAGE_BROKER_CONNECTION);
WebSocketServer.addMessageListener(InstantObserver.onMessage);
WebSocketServer.startServer(PORT);
MessageBroker.consume(
    ShortTermObserver.QUEUE_NAME,
    ShortTermObserver.onMessage
);
