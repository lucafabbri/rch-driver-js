import { Driver } from "./Driver";

export class TcpIpDriver extends Driver {
    close(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    open(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    sendCommand(command: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    ETHIp: string = "192.168.1.10";
    ETHPort: number | null = 23;
}