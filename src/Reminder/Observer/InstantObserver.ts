import { Reminder } from "../Reminder";
import { Observer } from "./Observer";

export interface InstantEngine {
    broadcast(msg: string): void;
}

export class InstantObserver implements Observer {
    private static engine: InstantEngine;

    public static useEngine(engine: InstantEngine) {
        this.engine = engine;
    }

    public static onMessage(mesage: string): void {
        const reminder = Reminder.fromString(mesage);
        reminder.notify();
    }

    sendReminder(reminder: Reminder): void {
        InstantObserver.engine.broadcast(reminder.message);
    }
}
