import { Reminder } from "../reminder";
import { InstantObserver } from "./instant-observer";
import { DateUtils } from "../../date/date-utils";
import { ShortTermObserver } from "./short-term-observer";
import { LongTermObserver } from "./long-term-observer";

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
