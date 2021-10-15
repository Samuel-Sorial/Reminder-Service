import { Reminder } from "../Reminder";
import { Observer } from "./Observer";
import { MessageBroker } from "../../MessageBroker/MessageBroker";
import { DateUtils } from "../../Date/DateUtils";

export class ShortTermObserver implements Observer {
    public static readonly INTERVAL_MILLSECONDS = 3 * 60 * 1000;
    public static readonly QUEUE_NAME = "reminder";

    public static onMessage(message: string) {
        const reminder = Reminder.fromString(message);
        reminder.notify();
    }
    async sendReminder(reminder: Reminder) {
        const durationInMillSeconds = DateUtils.subtractInMillSeconds(
            reminder.date,
            new Date()
        );
        if (durationInMillSeconds <= 0) {
            throw new Error("Wrong observer!");
        }
        await MessageBroker.delayedPublish(
            reminder.toString(),
            ShortTermObserver.QUEUE_NAME,
            durationInMillSeconds
        );
    }
}
