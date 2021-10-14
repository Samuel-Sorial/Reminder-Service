export class Reminder {
    public readonly date: Date;
    public readonly message: string;

    constructor(date: Date, message: string) {
        this.date = date;
        this.message = message;
    }

    public notify(): void {
        throw Error("Not implemented yet.");
    }
}
