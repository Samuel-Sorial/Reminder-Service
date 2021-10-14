import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export class LongTermObserver implements Observer {
    sendReminder(reminder: Reminder): void {}
}
