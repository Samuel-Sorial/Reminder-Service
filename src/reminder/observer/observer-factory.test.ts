import { ObserverFactory } from "./observer-factory";
import { InstantObserver } from "./instant-observer";
import { ShortTermObserver } from "./short-term-observer";
import { LongTermObserver } from "./long-term-observer";
import { loadConfig } from "../../config";

describe("observer factory", function () {
    const { INTERVAL_MILLISECONDS } = loadConfig();
    it("returns instant in case of now", function () {
        const observer = ObserverFactory(new Date());

        expect(observer).toBeInstanceOf(InstantObserver);
    });

    it("returns instant in case of before", function () {
        const beforeDate = new Date();
        beforeDate.setMinutes(beforeDate.getMinutes() - 5);
        const observer = ObserverFactory(beforeDate);

        expect(observer).toBeInstanceOf(InstantObserver);
    });

    it("returns short term in case of within short term interval", function () {
        const withinShortTerm = new Date();
        withinShortTerm.setMilliseconds(
            withinShortTerm.getMilliseconds() + INTERVAL_MILLISECONDS - 10
        );
        const observer = ObserverFactory(withinShortTerm);

        expect(observer).toBeInstanceOf(ShortTermObserver);
    });

    it("returns long term in case of exceeded short term interval", function () {
        const exceededShortTerm = new Date();
        exceededShortTerm.setMilliseconds(
            exceededShortTerm.getMilliseconds() + INTERVAL_MILLISECONDS + 10
        );
        const observer = ObserverFactory(exceededShortTerm);

        expect(observer).toBeInstanceOf(LongTermObserver);
    });
});
