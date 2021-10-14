export class DateUtils {
    public static isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    public static subtractInMillSeconds(date1: Date, date2: Date): number {
        return date1.getTime() - date2.getTime();
    }
}
