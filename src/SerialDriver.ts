import { Driver } from "./Driver";

export class SerialDriver extends Driver {
    close(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    open(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    sendCommand(command: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    COMPort: string = "COM3";
    COMBaudRate: number = 9600;
}