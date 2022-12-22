export class DateUtils {
    public static isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    public static subtractInMillSeconds(date1: Date, date2: Date): number {
        return date1.getTime() - date2.getTime();
    }

    public static roundByMinutes(date: Date, toNext: number): Date {
        if (toNext === 0) {
            throw new RangeError("To next round should be greater than 0");
        }
        const dateCopy = new Date(date);
        const currentMinutes = dateCopy.getMinutes();
        const minutesToReachNext = toNext - (currentMinutes % toNext);
        let roundedToNext = minutesToReachNext + currentMinutes;

        if (
            roundedToNext === currentMinutes &&
            (dateCopy.getSeconds() !== 0 || dateCopy.getMilliseconds() !== 0)
        ) {
            roundedToNext = currentMinutes + toNext;
        }
        dateCopy.setMinutes(roundedToNext);
        dateCopy.setSeconds(0);
        dateCopy.setMilliseconds(0);
        return dateCopy;
    }

    public static floorByMinutes(date: Date, toLower: number): Date {
        if (toLower === 0) {
            throw new RangeError("To next round should be greater than 0");
        }
        const dateCopy = new Date(date);
        dateCopy.setMinutes(dateCopy.getMinutes() - toLower);

        return this.roundByMinutes(dateCopy, toLower);
    }
}
