import { WebSocketServer } from "./WebSocket/Server";
import { PORT } from "./Config/environment";

WebSocketServer.startServer(PORT);
WebSocketServer.addMessageListener((message) =>
    console.log(`Hello from websocket server! You just sent: ${message}`)
);
