import { Server, RawData, WebSocket } from "ws";

export class WebSocketServer {
    private static server: Server;

    public static startServer(port: number): void {
        if (this.server) {
            throw new Error(
                "Can not start more than one websocket server per process."
            );
        }
        this.server = new Server({ port });
    }

    public static addMessageListener(callback: (message: string) => void) {
        this.server.on("connection", (socket: WebSocket) => {
            socket.on("message", (message: RawData) => {
                callback(message.toString());
            });
        });
    }

    public static broadcast(msg: string) {
        this.server.clients.forEach((socket) => {
            if (socket.OPEN) {
                socket.send(msg);
            }
        });
    }
}
