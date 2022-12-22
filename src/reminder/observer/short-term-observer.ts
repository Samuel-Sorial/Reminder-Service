import { Reminder } from "../reminder";
import { Observer } from "./observer";
import { DateUtils } from "../../date/date-utils";

export interface ShortTermEngine {
    delayedPublish(msg: string, msgTopic: string, delay: number): void;
}

export class ShortTermObserver implements Observer {
    public static readonly INTERVAL_MILLISECONDS = 3 * 60 * 1000;
    public static readonly QUEUE_NAME = "reminder";
    private static engine: ShortTermEngine;

    public static useEngine(engine: ShortTermEngine) {
        this.engine = engine;
    }

    public static async onMessage(message: string) {
        const reminder = Reminder.fromString(message);
        await reminder.notify();
    }
    async sendReminder(reminder: Reminder) {
        const durationInMillSeconds = DateUtils.subtractInMillSeconds(
            reminder.date,
            new Date()
        );
        if (durationInMillSeconds <= 0) {
            throw new Error("Wrong observer!");
        }
        await ShortTermObserver.engine.delayedPublish(
            reminder.toString(),
            ShortTermObserver.QUEUE_NAME,
            durationInMillSeconds
        );
    }
}
