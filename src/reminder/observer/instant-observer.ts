import { Reminder } from "../reminder";
import { Observer } from "./observer";

export interface InstantEngine {
    broadcast(msg: string): void;
}

export class InstantObserver implements Observer {
    private static engine: InstantEngine;

    public static useEngine(engine: InstantEngine) {
        this.engine = engine;
    }

    public static async onMessage(message: string) {
        const reminder = Reminder.fromString(message);
        await reminder.notify();
    }

    sendReminder(reminder: Reminder): void {
        InstantObserver.engine.broadcast(reminder.message);
    }
}
