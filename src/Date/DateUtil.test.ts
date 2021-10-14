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
