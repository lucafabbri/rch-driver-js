import { IAbstractDevice } from "./IAbstractDevice";

export class AbstractDevice implements IAbstractDevice{
    serialNumber: string = "";
    partNumber: string = "";
    type: string = "";
    connection: string = "";
    ip: string = "";
    ipPort: number = 23;
    comPort: string = "";
    baudRate: number = 9600;
    hostName: string = "";
    macAddress: string = "";
    active: boolean = true;
}