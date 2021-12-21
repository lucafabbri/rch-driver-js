export interface AbstractDevice {
    active: boolean;
    baudRate: number;
    comPort: string;
    connection: string;
    hostName: string;
    ip: string;
    ipPort: number;
    macAddress: string;
    partNumber: string;
    serialNumber: string;
    type: string;
}