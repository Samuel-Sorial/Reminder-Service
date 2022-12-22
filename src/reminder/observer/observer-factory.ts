import { Reminder } from "../reminder";
import { DateUtils } from "../../date/date-utils";
import { InstantObserver } from "./instant-observer";
import { ShortTermObserver } from "./short-term-observer";
import { LongTermObserver } from "./long-term-observer";
import { Observer } from "./observer";
import { loadConfig } from "../../config";

const { INTERVAL_MILLISECONDS } = loadConfig();
export const ObserverFactory = (reminder: Reminder): Observer => {
    const durationMillSeconds = DateUtils.subtractInMillSeconds(
        reminder.date,
        new Date()
    );
    if (durationMillSeconds <= 0) {
        return new InstantObserver();
    } else if (durationMillSeconds <= INTERVAL_MILLISECONDS) {
        return new ShortTermObserver();
    } else {
        return new LongTermObserver();
    }
};
