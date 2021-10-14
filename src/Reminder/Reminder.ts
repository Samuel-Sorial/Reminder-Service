import { DateUtils } from "../Date/DateUtils";

export class Reminder {
    public readonly date: Date;
    public readonly message: string;

    constructor(date: Date, message: string) {
        this.date = date;
        this.message = message;
    }

    private static validateReminder(reminder: any) {
        throw Error("Not implemented yet.");
    }

    public static fromString(plainReminder: string) {
        const jsonReminder = JSON.parse(plainReminder);
        this.validateReminder(jsonReminder);
        return new Reminder(jsonReminder.date, jsonReminder.message);
    }

    public notify(): void {
        throw Error("Not implemented yet.");
    }
}
