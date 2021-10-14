import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export class ShortTermObserver implements Observer {
    public static readonly INTERVAL_MILLSECONDS = 5 * 60 * 1000;
    sendReminder(reminder: Reminder): void {}
}
