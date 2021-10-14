export class DateUtils {
    public static isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }
}
