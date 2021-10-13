import { WebSocketServer } from "./WebSocket/Server";
import { PORT } from "./config/environment";

WebSocketServer.startServer(PORT);
WebSocketServer.addMessageListener((message) =>
    console.log(`Hello from websocket server! You just sent: ${message}`)
);
