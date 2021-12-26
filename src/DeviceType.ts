export class DeviceType {
    static readonly PRINTF: string = "PRINTF";
    static readonly LDP33RT: string = "LDP33RT";
    static readonly ONDART: string = "ONDART";
    static readonly SPOTRT: string = "SPOTRT";
    static readonly ONDARTA: string = "ONDARTA";
    static readonly ABOX: string = "ABOX";
    static readonly LDP03: string = "LDP03";
    static readonly WALLE8T: string = "WALLE8T";
    static readonly ZERO55RT: string = "ZERO55RT";

    static fromSerialNumber(serialNumber: string): string {
        if (serialNumber.startsWith("U1") || serialNumber.startsWith("72MU1")) {
            return DeviceType.PRINTF;
        }
        else if (serialNumber.startsWith("U7") || serialNumber.startsWith("72EU7")) {
            return DeviceType.LDP33RT;
        }
        else if (serialNumber.startsWith("U8") || serialNumber.startsWith("72IU8")) {
            return DeviceType.ONDART;
        }
        else if (serialNumber.startsWith("U9") || serialNumber.startsWith("72IU9")) {
            return DeviceType.SPOTRT;
        }
        else if (serialNumber.startsWith("V5") || serialNumber.startsWith("72EV5")) {
            return DeviceType.ONDARTA;
        }
        else if (serialNumber.startsWith("U4") || serialNumber.startsWith("72MU4")) {
            return DeviceType.ABOX;
        }
        else if (serialNumber.startsWith("U5") || serialNumber.startsWith("72MU5")) {
            return DeviceType.LDP03;
        }
        else if (serialNumber.startsWith("V4") || serialNumber.startsWith("72MV4")) {
            return DeviceType.WALLE8T;
        }
        else if (serialNumber.startsWith("V1") || serialNumber.startsWith("72IV1")) {
            return DeviceType.ZERO55RT;
        }
        return "UNKNOW";
    }
}