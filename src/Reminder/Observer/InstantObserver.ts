import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export class InstantObserver implements Observer {
    public static onMessage(mesage: string): void {
        const reminder = Reminder.fromString(mesage);
        reminder.notify();
    }

    sendReminder(reminder: Reminder): void {}
}
