export class Utils {
    static toRtFormat(serialNumber: string): string {
        if (serialNumber.startsWith("72")) {
            return serialNumber;
        } else {
            return "72M" + serialNumber.substring(0, 2) + serialNumber.substring(4);
        }
    }
}