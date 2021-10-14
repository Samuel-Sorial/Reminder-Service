import { DateUtils } from "../Date/DateUtils";
import { ObserverFactory } from "./Observer/Observer";

export class Reminder {
    public readonly date: Date;
    public readonly message: string;

    constructor(date: Date, message: string) {
        if (!DateUtils.isValidDate(date)) {
            throw new RangeError("Please provide a valid date for reminder.");
        }
        this.date = date;
        this.message = message;
    }

    private static validateReminder(reminder: any) {
        if (!reminder.message || !reminder.date) {
            throw new RangeError("Please provide a complete reminder object.");
        }
    }

    public static fromString(plainReminder: string) {
        const jsonReminder = JSON.parse(plainReminder);
        this.validateReminder(jsonReminder);
        return new Reminder(new Date(jsonReminder.date), jsonReminder.message);
    }

    public notify(): void {
        let observer = ObserverFactory(this);
        try {
            observer.sendReminder(this);
        } catch (error) {
            // Means that reminder observer type changed while processing, re-generate it
            observer = ObserverFactory(this);
            observer.sendReminder(this);
        }
    }
}
