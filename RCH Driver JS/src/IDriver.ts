import { IEcrDevice } from "./IEcrDevice";
import { Document } from "./Document";
import { RchProtocol } from "./protocol/RchProtocol"
import { IProg } from "./interfaces/prog";
import { PrinterStatus } from "./printer/PrinterStatus";
import { DeviceStatus } from "./printer/DeviceStatus";
import { BillDTO, PrintBillResponseDTO } from ".";

export interface IDriver {
    //base commands
    close(): Promise<boolean>;
    open(): Promise<boolean>;
    sendCommand(command: string): Promise<RchProtocol>;
    sendCommands(commands: Array<string>): Promise<Array<RchProtocol>>;

    //discovery
    discovery(): Promise<Array<IEcrDevice>>;

    //composed actions
    dumpDGFE(date: string): Promise<Array<Document>>;
    allProgramming(): Promise<IProg | null>;
    zReport(): Promise<boolean>;
    xReport(): Promise<boolean>;

    //print
    print(rows: string[], cutPaper: boolean, header: boolean): Promise<boolean>;
    printReceipt(bill: BillDTO): Promise<PrintBillResponseDTO>;

    //statuses
    printerStatus(): Promise<PrinterStatus | null>;
    deviceStatus(): Promise<DeviceStatus | null>;

    //listeners
    addCommandEventListener(listner: Function): Function;
}