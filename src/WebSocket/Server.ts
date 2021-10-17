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
        console.log(`Started successfully WebSocket server on port ${port}`);
    }

    public static addMessageListener(
        callback: (message: string) => Promise<void>
    ) {
        this.server.on("connection", (socket: WebSocket) => {
            socket.on("message", async (message: RawData) => {
                try {
                    await callback(message.toString());
                } catch (error) {
                    socket.send(
                        `Invalid reminder, a valid reminder should be like:
                         "{"message": String, "date": String"}" where date is an ISO string.`
                    );
                }
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
