import { Reminder } from "../Reminder";

export interface Observer {
    sendReminder(reminder: Reminder): void;
}
