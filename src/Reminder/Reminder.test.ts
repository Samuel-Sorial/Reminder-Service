import { Reminder } from "./Reminder";

describe("create reminder from string", function () {
    it("fails given invalid json string", function () {
        const createReminder = () => Reminder.fromString("");
        expect(createReminder).toThrowError(SyntaxError);
    });

    it("fails when missing date", function () {
        const createReminder = () => Reminder.fromString(`{"message":"test"}`);
        expect(createReminder).toThrowError(RangeError);
    });

    it("fails when missing message ", function () {
        const createReminder = () =>
            Reminder.fromString(`{"date":"${new Date().toISOString()}"}`);
        expect(createReminder).toThrowError(RangeError);
    });
    it("sucess when given correct date & message", function () {
        const createReminder = () =>
            Reminder.fromString(
                `{"date":"${new Date().toISOString()}", "message": "test"}`
            );
        expect(createReminder).not.toThrowError();
    });
});
