import { Reminder } from "../Reminder";
import { Observer } from "./Observer";
import { Database } from "../../Database/Database";

export class LongTermObserver implements Observer {
    private static getListName(date: Date): string {
        throw new Error("Not implemented yet");
    }

    async sendReminder(reminder: Reminder) {
        const listName = LongTermObserver.getListName(reminder.date);
        await Database.addToList(listName, reminder.toString());
    }
}
