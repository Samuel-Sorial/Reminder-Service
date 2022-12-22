import { DateUtils } from "./date-utils";

describe("Validate date", function () {
    it("retruns true when given valid date", function () {
        const isValidDate = DateUtils.isValidDate(new Date());

        expect(isValidDate).toBe(true);
    });

    it("retruns false when given invalid date", function () {
        const isValidDate = DateUtils.isValidDate(new Date(""));

        expect(isValidDate).toBe(false);
    });
});

describe("Subtract two dates", function () {
    it("returns correct value when first date greater than second", function () {
        const firstDate = new Date();
        const secondDate = new Date();
        const DIFF_IN_MINUTES = 5;
        secondDate.setMinutes(firstDate.getMinutes() - DIFF_IN_MINUTES);
        const durationMillSeconds = DateUtils.subtractInMillSeconds(
            firstDate,
            secondDate
        );

        expect(durationMillSeconds).toBe(DIFF_IN_MINUTES * 60 * 1000);
    });

    it("returns correct value when first date less than second", function () {
        const firstDate = new Date();
        const secondDate = new Date();
        const DIFF_IN_MINUTES = 5;
        secondDate.setMinutes(firstDate.getMinutes() + 5);
        const durationMillSeconds = DateUtils.subtractInMillSeconds(
            firstDate,
            secondDate
        );

        expect(durationMillSeconds).toBe(-DIFF_IN_MINUTES * 60 * 1000);
    });

    it("returns 0 when same date", function () {
        const date = new Date();

        const durationMillSeconds = DateUtils.subtractInMillSeconds(date, date);

        expect(durationMillSeconds).toBe(0);
    });
});

describe("round to next n minutes", function () {
    describe("returns next n minutes when current = 0", function () {
        test("10 when minutes 0 and next = 10", function () {
            const date = new Date();
            date.setMinutes(0);
            const roundedDate = DateUtils.roundByMinutes(date, 10);
            expect(roundedDate.getMinutes()).toBe(10);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("8 when minutes 0 and next = 8", function () {
            const date = new Date();
            date.setMinutes(0);
            const roundedDate = DateUtils.roundByMinutes(date, 8);
            expect(roundedDate.getMinutes()).toBe(8);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("3 when minutes 0 and next = 3", function () {
            const date = new Date();
            date.setMinutes(0);
            const roundedDate = DateUtils.roundByMinutes(date, 3);
            expect(roundedDate.getMinutes()).toBe(3);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });
    });

    describe("returns next n minutes when current is in between", function () {
        test("20 when minutes 12 and next = 10", function () {
            const date = new Date();
            date.setMinutes(12);
            const roundedDate = DateUtils.roundByMinutes(date, 10);
            expect(roundedDate.getMinutes()).toBe(20);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("16 when minutes 11 and next = 8", function () {
            const date = new Date();
            date.setMinutes(11);
            const roundedDate = DateUtils.roundByMinutes(date, 8);
            expect(roundedDate.getMinutes()).toBe(16);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("27 when minutes 25 and next = 3", function () {
            const date = new Date();
            date.setMinutes(25);
            const roundedDate = DateUtils.roundByMinutes(date, 3);
            expect(roundedDate.getMinutes()).toBe(27);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });
    });

    it("returns next n when the same but seconds greater than 0", function () {
        const date = new Date();
        date.setMinutes(10);
        date.setSeconds(1);
        const roundedDate = DateUtils.roundByMinutes(date, 10);
        expect(roundedDate.getMinutes()).toBe(20);
    });

    it("returns next n when the same but millseconds greater than 0", function () {
        const date = new Date();
        date.setMinutes(10);
        date.setMilliseconds(1);
        const roundedDate = DateUtils.roundByMinutes(date, 10);
        expect(roundedDate.getMinutes()).toBe(20);
    });

    it("always zeroes seconds & millseconds", function () {
        const date = new Date();
        const roundedDate = DateUtils.roundByMinutes(date, 10);
        expect(roundedDate.getSeconds()).toBe(0);
        expect(roundedDate.getMilliseconds()).toBe(0);
        expect(roundedDate.getUTCMilliseconds()).toBe(0);
    });
});

describe("floor to lower n minutes", function () {
    test("returns same n minutes when current = 0", function () {
        const date = new Date();
        date.setMinutes(0);
        const roundedDate = DateUtils.floorByMinutes(date, 10);
        expect(roundedDate.getMinutes()).toBe(0);
        expect(roundedDate.getHours()).toBe(date.getHours());
    });

    describe("returns lower n minutes when current is in between", function () {
        test("10 when minutes 12 and lower = 10", function () {
            const date = new Date();
            date.setMinutes(12);
            const roundedDate = DateUtils.floorByMinutes(date, 10);
            expect(roundedDate.getMinutes()).toBe(10);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("8 when minutes 11 and lower = 8", function () {
            const date = new Date();
            date.setMinutes(11);
            const roundedDate = DateUtils.floorByMinutes(date, 8);
            expect(roundedDate.getMinutes()).toBe(8);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });

        test("24 when minutes 25 and lower = 3", function () {
            const date = new Date();
            date.setMinutes(25);
            const roundedDate = DateUtils.floorByMinutes(date, 3);
            expect(roundedDate.getMinutes()).toBe(24);
            expect(roundedDate.getHours()).toBe(date.getHours());
        });
    });

    it("always zeroes seconds & millseconds", function () {
        const date = new Date();
        const roundedDate = DateUtils.floorByMinutes(date, 10);
        expect(roundedDate.getSeconds()).toBe(0);
        expect(roundedDate.getMilliseconds()).toBe(0);
        expect(roundedDate.getUTCMilliseconds()).toBe(0);
    });
});
