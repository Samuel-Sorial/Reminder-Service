import { Server, RawData, WebSocket } from "ws";

export class WebSocketServer {
    private static server: Server;

    public static startServer(port: number): void {
        if (WebSocketServer.server) {
            throw new Error(
                "Can not start more than one websocket server per process."
            );
        }
        WebSocketServer.server = new Server({ port });
    }

    public static addMessageListener(callback: (message: string) => void) {
        WebSocketServer.server.on("connection", (socket: WebSocket) => {
            socket.on("message", (message: RawData) => {
                callback(message.toString());
            });
        });
    }
}
