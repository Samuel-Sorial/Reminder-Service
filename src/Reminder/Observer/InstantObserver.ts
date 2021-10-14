import { Reminder } from "../Reminder";
import { Observer } from "./Observer";
import { WebSocketServer } from "../../WebSocket/Server";

export class InstantObserver implements Observer {
    public static onMessage(mesage: string): void {
        const reminder = Reminder.fromString(mesage);
        reminder.notify();
    }

    sendReminder(reminder: Reminder): void {
        WebSocketServer.broadcast(reminder.message);
    }
}
