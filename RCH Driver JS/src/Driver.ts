import { IDevice } from "local-devices";
import { ComConst } from "./ComConst";
import { ConnectionConst } from "./ConnectionConst";
import { DeviceType } from "./DeviceType";
import { EcrDevice } from "./EcrDevice";
import { IDriver } from "./IDriver";
import { IEcrDevice } from "./IEcrDevice";
import { Prog } from "./models/Prog";
import { Crawler } from "./network/Crawler";
import { Core } from "./protocol/Core";
import { RchProtocol } from "./protocol/RchProtocol";
import { RchDefault } from "./utils/RchDefault";
import { Utils } from "./utils/Utils";
import { Document } from "./Document";
import { RegexUtils } from "./utils/RegexUtils";
import { IProg } from "./interfaces/prog";
import { BillDTO } from "./dto/BillDTO";
import { PrintBillResponseDTO } from "./dto/PrintBillResponseDTO";
import { Duplex } from "stream";
import { RchMessage } from "./protocol/RchMessage";
import { PrinterStatus } from "./printer/PrinterStatus";
import { DeviceStatus } from "./printer/DeviceStatus";

export abstract class Driver implements IDriver {
    packIds: string = "01234567879abcdefghijklmnopqrstuvwxyzaABCDEFGHIJKLMNOPQRSTUVWXYZ";
    packId: number = 10;
    commandEventListeners: Function[] = [];
    isETX = false;
    buffer: number[] = [];
    sessionCommands: { [key: string]: RchProtocol[] } = {}
    logTag: string = "[Driver]: ";
    abstract client: Duplex | null | undefined;
    core: Core = new Core();

    abstract open(): Promise<boolean>;

    abstract discovery(): Promise<IEcrDevice[]>;

    addCommandEventListener(listner: Function): Function {
        this.commandEventListeners.push(listner);
        return () => {
            this.commandEventListeners.splice(this.commandEventListeners.indexOf(listner), 1);
        }
    }

    close(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                this.client?.on("close", () => {
                    console.log("connection closed");
                    this.client = null;
                    resolve(true);
                })
                this.client?.destroy()
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCommand(command: string): Promise<RchProtocol> {
        return new Promise((resolve, reject) => {
            var result: RchProtocol;
            try {
                var bytesRead = 0;
                var onDataListener = (data: Buffer) => {
                    try {
                        bytesRead = data.buffer.byteLength;
                        if (bytesRead > 0) {
                            var dataRead = this.readData(Buffer.from(data.toString(), "ascii"))
                            if (dataRead.length > 0) {
                                result.response = result.response.concat(dataRead.map(d => new RchMessage(d)));
                            }
                        }
                    }
                    catch { bytesRead = 0; }

                    if (this.isETX) {
                        this.onCommand(result);
                        resolve(result);
                    } else {
                        this.client?.once("data", onDataListener);
                    }
                }
                this.client?.once("data", onDataListener);

                var byteSend = this.formatCommandToByteArray(command);
                var bufferSend = Buffer.from(byteSend);
                result = new RchProtocol(bufferSend.slice(1, bufferSend.length - 1).toString("ascii"));

                this.client?.write(bufferSend, "ascii", (error) => {
                    if (error) {
                        reject(error.message);
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    async sendCommands(commands: string[]): Promise<Array<RchProtocol>> {
        var results: Array<RchProtocol> = []
        try {
            for (var i = 0; i < commands.length; i++) {
                results = results.concat(await this.sendCommand(commands[i]));
            }
        } catch (e) {
            console.log(e);
        }
        return results;
    }

    formatCommandToByteArray(command: string): number[] {
        var result: number[] = [];
        this.packId = this.packId == this.packIds.length - 1 ? 0 : this.packId + 1;

        result.push(ComConst.CHR_STX); //<STX>
        result.push(...Buffer.from("01")); //<ADDS>
        result.push(...Buffer.from(command.length.toString().padStart(3, '0'))); //<LUNGH>
        result.push(...Buffer.from(ComConst.CHR_NUOVOPROTOCOLLO)); //<PROT-ID>
        result.push(...Buffer.from(command)); //<DATI>
        result.push(this.packIds.charCodeAt(this.packId))//<PACK-ID>
        result.push(...Buffer.from(this.calculateBcc(result))); //<CHK>
        result.push(ComConst.CHR_ETX); //<ETX>

        return result;
    }

    protected setTimeOut(command: string): number {
        return ComConst.hashtableAPP[command] ?? ComConst.Cmd_Timeout;
    }

    private calculateBcc(items: number[]): string {
        return Utils.calculateBcc(items);
    }

    protected async populateDevice(device: EcrDevice): Promise<EcrDevice | null> {
        try {
            if (await this.open()) {
                var rchDefaults = new RchDefault();
                
                var sendCommandResult = await this.sendCommand(this.core.getSerialNumber());

                if (sendCommandResult.isSuccess) {
                    var response = sendCommandResult.response[0];

                    if (!response.isError) {
                        device.serialNumber = Utils.toRtFormat(response.data.replace(' ', ''));
                        device.type = DeviceType.fromSerialNumber(device.serialNumber);

                        var fwRevisionResult = await this.sendCommand(this.core.getFirmwareRevision());
                        if (fwRevisionResult.isSuccess) {
                            device.fwVersionLabel = fwRevisionResult.response[0].data;
                        }

                        var deviceCapability = rchDefaults.getDeviceCapability(device.type, device.fwVersion);

                        if (deviceCapability != null) {
                            device.hasProgDump = deviceCapability.hasProgDump;
                            device.hasDgfeFreeSpace = deviceCapability.hasDgfeFreeSpace;
                            device.nDepartments = deviceCapability.nDepartments;
                            device.nOperators = deviceCapability.nOperators;
                            device.nPayments = deviceCapability.nPayments;
                            device.nVats = deviceCapability.nVats;
                            if (deviceCapability.hasProgDump) {
                                device.prog = await this.allProgramming();
                            }
                            if (!device.prog) {
                                device.prog = rchDefaults.getProgByDevice(device.type, device.fwVersion);
                            }
                        }
                        return device;
                    }
                };
                await this.close();
            }
        } catch (e) {
            console.error(this.logTag + "#populateDevice " + e);
        }
        return null;
    }

    async dumpDGFE(date: string): Promise<Array<Document>> {
        var result: Document[] = [];

        try {
            if (await this.open()) {
                
                await this.sendCommand(this.core.prg());
                await this.sendCommand(this.core.clear());
                var sendCommandResult = await this.sendCommand(this.core.C452(date));
                if (sendCommandResult.isSuccess) {
                    var rows = sendCommandResult.responseBody;
                    var document = new Document();
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        document.rows.push(row);
                        var documentDate = RegexUtils.matchRtDate(row);
                        var documentNumber = RegexUtils.matchRtDocumentNumber(row);
                        if (documentDate != null) {
                            document.date = documentDate;
                        }
                        if (documentNumber != null) {
                            document.closure = documentNumber[0];
                            document.number = documentNumber[1];
                        }
                        if (RegexUtils.matchRtDocumentGestionale(row)) {
                            document.isNotFiscal = true;
                        }
                        if (RegexUtils.matchRtSerialNumber(row)) {
                            result.push(document);
                            document = new Document();
                        }
                    }
                }
                await this.sendCommand(this.core.clear());
                await this.sendCommand(this.core.reg());
                await this.close();
            }
        } catch (e) {
            console.error(e);
            await this.close();
        }
        return result;
    }

    async allProgramming(): Promise<IProg | null> {
        try {
            
            await this.sendCommand(this.core.clear());
            await this.sendCommand(this.core.prg());
            var result = await this.sendCommand(this.core.allProgramming());
            await this.sendCommand(this.core.clear());
            await this.sendCommand(this.core.reg());
            if (!result.isSuccess) {
                return null;
            } else {
                return new Prog(result.responseBody);
            }

        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async printReceipt(bill: BillDTO): Promise<PrintBillResponseDTO> {
        
        var result = new PrintBillResponseDTO();
        try {
            var commands: string[] = [];
            commands.push(this.core.clear());
            bill.lineItems.forEach(async item => {
                commands.push(this.core.departmentSellFromLineItem(item));
                if (item.discount) {
                    if (item.discount.percent) {
                        commands.push(this.core.discountPercentage(item.discount.percent, item.discount.description));
                    } else if (item.discount.value) {
                        commands.push(this.core.discountValue(item.discount.value, item.discount.description));
                    }
                }
            })
            commands.push(this.core.subtotal());
            if (bill.lotteryCode) {
                commands.push(this.core.lottery(bill.lotteryCode));
            }
            bill.paymentItems.forEach(async item => {
                commands.push(this.core.paymentFromPaymentItem(item));
            })
            commands.push(this.core.closeReceipt());
            commands.push(this.core.terminateOperation());
            commands.push(this.core.clear());
            var sendCommandsResult = await this.sendCommands(commands);
            //var result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
        } catch (e) {
            console.error(e)
        }
        return result;
    }

    async zReport(): Promise<boolean> {
        
        try {
            var commands: string[] = [];
            commands.push(this.core.clear());
            commands.push(this.core.z());
            commands.push(this.core.zReport());
            commands.push(this.core.reg());
            commands.push(this.core.clear());
            var sendCommandsResult = await this.sendCommands(commands);
            var result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
            return result;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async xReport(): Promise<boolean> {
        
        try {
            var commands: string[] = [];
            commands.push(this.core.clear());
            commands.push(this.core.x());
            commands.push(this.core.xReport());
            commands.push(this.core.reg());
            commands.push(this.core.clear());
            var sendCommandsResult = await this.sendCommands(commands);
            var result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
            return result;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async print(rows: string[], cutPaper: boolean = false, header: boolean = false): Promise<boolean> {
        
        try {
            var commands: string[] = [];
            commands.push(this.core.clear());
            commands.push(this.core.reg());
            commands.push(this.core.openNonFiscalReceipt(cutPaper, header));
            rows.forEach(row => {
                commands.push(this.core.printRow(row, false));
            })
            commands.push(this.core.closeNonFiscalReceipt());
            commands.push(this.core.closeReceipt());
            commands.push(this.core.terminateOperation());
            commands.push(this.core.clear());
            var sendCommandsResult = await this.sendCommands(commands);
            var result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
            return result;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async printerStatus(): Promise<PrinterStatus | null> {
        try {
            var result = await this.sendCommand(this.core.printerStatus());
            if (result.isSuccess) {
                return new PrinterStatus(result.response[0].data);
            } else {
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async deviceStatus(): Promise<DeviceStatus | null> {
        try {
            var result = await this.sendCommand(this.core.deviceStatus());
            if (result.isSuccess) {
                return new DeviceStatus(result.response[0].data);
            } else {
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    protected onCommand(rchProtocol: RchProtocol) {
        this.commandEventListeners.forEach(listner => listner(rchProtocol));
    }

    protected timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected readData(bytesRead: Buffer): string[] {
        this.isETX = false;
        var result: string[] = [];

        bytesRead.forEach(b => {
            if (b != ComConst.CHR_ACK && b != ComConst.CHR_STX && b != ComConst.CHR_ETX && b != ComConst.CHR_LF && b != ComConst.CHR_NACK && b != ComConst.CHR_CR) {
                this.buffer.push(b);
            }
            if (b == ComConst.CHR_CR || b == ComConst.CHR_LF || b == ComConst.CHR_ETX) {
                if (this.buffer.length > 0) {
                    var response = Buffer.from(this.buffer).toString("ascii");
                    result.push(response);
                    this.buffer = [];
                }

                if (b == ComConst.CHR_ETX) {
                    this.isETX = true;
                }
            }
        })
        return result;
    }
}