import { Reminder } from "../reminder";


export interface Observer {
    sendReminder(reminder: Reminder): void;
}

