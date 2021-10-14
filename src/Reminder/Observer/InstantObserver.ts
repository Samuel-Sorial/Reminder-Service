import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export class InstantObserver implements Observer {
    sendReminder(reminder: Reminder): void {}
}
