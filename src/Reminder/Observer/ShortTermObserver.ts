import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export class ShortTermObserver implements Observer {
    public static readonly INTERVAL_MILLSECONDS = 5 * 60 * 1000;
    public static readonly QUEUE_NAME = "reminder";

    public static onMessage(message: string) {
        const reminder = Reminder.fromString(message);
        reminder.notify();
    }
    sendReminder(reminder: Reminder): void {}
}
