import { Reminder } from "../Reminder";
import { InstantObserver } from "./InstantObserver";
import { DateUtils } from "../../Date/DateUtils";
import { ShortTermObserver } from "./ShortTermObserver";
import { LongTermObserver } from "./LongTermObserver";

export interface Observer {
    sendReminder(reminder: Reminder): void;
}

export const ObserverFactory = (reminder: Reminder): Observer => {
    const durationMillSeconds = DateUtils.subtractInMillSeconds(
        reminder.date,
        new Date()
    );
    if (durationMillSeconds <= 0) {
        return new InstantObserver();
    } else if (durationMillSeconds <= ShortTermObserver.INTERVAL_MILLSECONDS) {
        return new ShortTermObserver();
    } else {
        return new LongTermObserver();
    }
};
