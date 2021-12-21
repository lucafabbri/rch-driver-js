export interface AbstractDevice {
    serialNumber: string;
    partNumber: string;
    type: string;
    connection: string;
    ip: string;
    ipPort: number;
    comPort: string;
    baudRate: number;
    hostName: string;
    macAddress: string;
    active: boolean;
}