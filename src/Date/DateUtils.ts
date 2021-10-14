export class DateUtils {
    public static isValidDate(date: Date): boolean {
        console.log(date);
        return !isNaN(date.getTime());
    }
}
