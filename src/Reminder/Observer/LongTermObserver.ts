import { Reminder } from "../Reminder";
import { Observer } from "./Observer";
import { Database } from "../../Database/Database";
import { DateUtils } from "../../Date/DateUtils";

export class LongTermObserver implements Observer {
    private static getNearestGroup(date: Date): string {
        return DateUtils.floorByMinutes(date, 1).toISOString();
    }

    static async moveNextGroupToNextObserver() {
        const listName = DateUtils.roundByMinutes(new Date(), 1).toISOString();
        const reminders = await Database.getListElements(listName);
        reminders.forEach((reminder) => {
            const parsedReminder = Reminder.fromString(reminder);

            parsedReminder.notify();
        });
        await Database.removeList(listName);
        return { listName, totalReminders: reminders.length };
    }

    async sendReminder(reminder: Reminder) {
        const listName = LongTermObserver.getNearestGroup(reminder.date);
        await Database.addToList(listName, reminder.toString());
    }
}
