import { IEcrDevice } from "./IEcrDevice";
import { Document } from "./Document";

export interface IDriver {
    close(): Promise<boolean>;
    open(): Promise<boolean>;
    sendCommand(command: string): Promise<Array<string>>;
    sendCommands(commands: Array<string>): Promise<Array<string>>;
    discovery(): Promise<Array<IEcrDevice>>;
    dumpDGFE(date: string): Promise<Array<Document>>;
    addCommandEventListener(listner: Function): Function;
    addStatusEventListener(listner: Function): Function;
}