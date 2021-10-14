import { DateUtils } from "./DateUtils";

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
