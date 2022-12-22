import { Reminder } from "../reminder";
import { Observer } from "./observer";
import { DateUtils } from "../../date/date-utils";

export interface LongTermEngine {
    getListElements(listName: string): Promise<string[]>;
    removeList(listName: string): Promise<void>;
    addToList(listName: string, msg: string): Promise<void>;
}

export class LongTermObserver implements Observer {
    private static engine: LongTermEngine;

    private static getNearestGroup(date: Date): string {
        return DateUtils.floorByMinutes(date, 1).toISOString();
    }

    static useEngine(engine: LongTermEngine) {
        this.engine = engine;
    }

    static async moveNextGroupToNextObserver() {
        const listName = DateUtils.roundByMinutes(new Date(), 1).toISOString();
        const reminders = await LongTermObserver.engine.getListElements(
            listName
        );
        const remindersPromises = reminders.map(async (reminder) => {
            const parsedReminder = Reminder.fromString(reminder);
            return parsedReminder.notify();
        });
        await Promise.all(remindersPromises);

        await LongTermObserver.engine.removeList(listName);
        return { listName, totalReminders: reminders.length };
    }

    async sendReminder(reminder: Reminder) {
        const listName = LongTermObserver.getNearestGroup(reminder.date);
        await LongTermObserver.engine.addToList(listName, reminder.toString());
    }
}
