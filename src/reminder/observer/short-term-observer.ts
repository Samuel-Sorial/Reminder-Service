import { Reminder } from "../reminder";
import { Observer } from "./observer";
import { DateUtils } from "../../date/date-utils";

export interface ShortTermEngine {
    delayedPublish(msg: string, msgTopic: string, delay: number): void;
}

export class ShortTermObserver implements Observer {
    private static engine: ShortTermEngine;
    private static topic: string;
    public static useEngine(engine: ShortTermEngine, topic: string) {
        this.engine = engine;
        this.topic = topic;
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
            ShortTermObserver.topic,
            durationInMillSeconds
        );
    }
}
