import { ObserverFactory } from "./observer-factory";
import { Reminder } from "../reminder";
import { InstantObserver } from "./instant-observer";
import { ShortTermObserver } from "./short-term-observer";
import { LongTermObserver } from "./long-term-observer";

describe("observer factory", function () {
    it("returns instant in case of now", function () {
        const observer = ObserverFactory(new Reminder(new Date(), "t"));

        expect(observer).toBeInstanceOf(InstantObserver);
    });

    it("returns instant in case of before", function () {
        const beforeDate = new Date();
        beforeDate.setMinutes(beforeDate.getMinutes() - 5);
        const observer = ObserverFactory(new Reminder(beforeDate, "t"));

        expect(observer).toBeInstanceOf(InstantObserver);
    });

    it("returns short term in case of within short term interval", function () {
        const withinShortTerm = new Date();
        withinShortTerm.setMilliseconds(
            withinShortTerm.getMilliseconds() +
                ShortTermObserver.INTERVAL_MILLSECONDS -
                10
        );
        const observer = ObserverFactory(new Reminder(withinShortTerm, "t"));

        expect(observer).toBeInstanceOf(ShortTermObserver);
    });

    it("returns long term in case of exceeded short term interval", function () {
        const exceededShortTerm = new Date();
        exceededShortTerm.setMilliseconds(
            exceededShortTerm.getMilliseconds() +
                ShortTermObserver.INTERVAL_MILLSECONDS +
                10
        );
        const observer = ObserverFactory(new Reminder(exceededShortTerm, "t"));

        expect(observer).toBeInstanceOf(LongTermObserver);
    });
});
