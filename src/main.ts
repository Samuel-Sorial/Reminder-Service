import { WebSocketServer } from "./WebSocket/Server";
import { MessageBroker } from "./MessageBroker/MessageBroker";
import { PORT, MESSAGE_BROKER_CONNECTION } from "./Config/environment";

if (!MESSAGE_BROKER_CONNECTION) {
    throw new Error(
        "Can not start service without specifying Message Broker connection string."
    );
}
MessageBroker.connect(MESSAGE_BROKER_CONNECTION);
WebSocketServer.startServer(PORT);
