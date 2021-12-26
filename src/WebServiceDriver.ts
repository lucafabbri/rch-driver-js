import { Driver } from "./Driver";

export class WebServiceDriver extends Driver {
    close(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    open(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    sendCommand(command: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    URL: string = "http://192.168.1.10";
}