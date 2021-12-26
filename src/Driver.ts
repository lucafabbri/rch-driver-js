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
import { ProtocolResponse } from "./protocol/ProtocolResponse";
import { RchDefault } from "./utils/RchDefault";
import { Utils } from "./utils/Utils";
import { Document } from "./Document";

export abstract class Driver implements IDriver {
    commandEventListeners: Function[] = [];
    statusEventListeners: Function[] = [];
    packId: number = 0;

    addCommandEventListener(listner: Function): Function {
        this.commandEventListeners.push(listner);
        return () => {
            this.commandEventListeners.splice(this.commandEventListeners.indexOf(listner), 1);
        }
    }
    addStatusEventListener(listner: Function): Function {
        this.statusEventListeners.push(listner);
        return () => {
            this.statusEventListeners.splice(this.statusEventListeners.indexOf(listner), 1);
        }
    }

    abstract close(): Promise<boolean>;

    abstract open(): Promise<boolean>;

    abstract sendCommand(command: string): Promise<Array<string>>;

    sendCommands(commands: string[]): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            var results: Array<string> = []
            try {
                commands.forEach(async (command) => {
                    results.concat(await this.sendCommand(command));
                })
                resolve(results);
            } catch (e) {
                reject(e)
            }
        });
    }

    abstract discovery(): Promise<IEcrDevice[]>;

    formatCommandToByteArray(command: string): number[] {
        var result: number[] = [];

        result.push(ComConst.CHR_STX); //<STX>
        result.push(...Buffer.from("01")); //<ADDS>
        result.push(...Buffer.from(command.length.toString().padStart(3, '0'))); //<LUNGH>
        result.push(...Buffer.from(ComConst.CHR_NUOVOPROTOCOLLO)); //<PROT-ID>
        result.push(...Buffer.from(command)); //<DATI>
        result.push(48 + this.packId)//<PACK-ID>
        result.push(...Buffer.from(this.calculateBcc(result).toString(16))); //<CHK>
        result.push(ComConst.CHR_ETX); //<ETX>

        this.packId = this.packId > 9 ? 0 : this.packId + 1;

        return result;
    }

    protected setTimeOut(command: string): number {
        return ComConst.hashtableAPP[command] ?? ComConst.Cmd_Timeout;
    }

    private calculateBcc(items: number[]): number {
        var result: number = 0;
        items.forEach(n => {
            if (n != ComConst.CHR_ETX) {
                if (n == ComConst.CHR_STX) {
                    result = ComConst.CHR_STX;
                } else {
                    result = result ^ n;
                }
            }
        });
        return result;
    }

    protected populateDevice(device: EcrDevice): Promise<EcrDevice> {
        return new Promise(async (resolve, reject) => {
            try {
                if (await this.open()) {
                    var rchDefaults = new RchDefault();
                    var core = new Core();
                    var sendCommandResults = await this.sendCommand(core.getSerialNumber());

                    sendCommandResults.forEach(async sendCommandResult => {
                        var response = new ProtocolResponse(sendCommandResult);
                        if (sendCommandResult && !response.isError) {
                            device.serialNumber = Utils.toRtFormat(response.payload.replace(' ', ''));
                            device.type = DeviceType.fromSerialNumber(device.serialNumber);

                            if (device.connection == ConnectionConst.TCPIP) {
                                var devices: IDevice[] = await Crawler.getLocalDevice(device.ip);
                                device.hostName = devices?.at(0)?.name ?? "";
                                device.macAddress = devices?.at(0)?.mac ?? "";
                            }

                            var fwRevisionResults = await this.sendCommand(core.getFirmwareRevision());
                            if (fwRevisionResults.length > 0) {
                                var fwRevisionResponse: ProtocolResponse = new ProtocolResponse(fwRevisionResults[0]);
                                device.fwVersionLabel = fwRevisionResponse.payload;
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
                                    await this.sendCommand(core.prg());
                                    var progDump = await this.sendCommand(core.allProgramming());
                                    await this.sendCommand(core.reg());
                                    if (progDump.length > 0) {
                                        device.prog = new Prog(progDump);
                                    }
                                }
                                else {
                                    device.prog = rchDefaults.getProgByDevice(device.type, device.fwVersion);
                                }
                            }
                            await this.close();
                            resolve(device);
                        }
                    });
                    await this.close();
                }
            } catch (e) {
                console.error(e);
                reject(null);
            }
        })
    }

    dumpDGFE(date: string): Promise<Array<Document>> {
        return new Promise(async (resolve, reject) => {
            var result: Document[] = [];

            try {
                if (await this.open()) {
                    var core = new Core();
                    await this.sendCommand(core.clear());
                    await this.sendCommand(core.reg());
                    var sendCommandResults = await this.sendCommand(core.C452(date));
                    var rows = sendCommandResults.slice(11, sendCommandResults.length-17);
                    var document = new Document();
                    rows.forEach(sendCommandResult => {
                        document.rows.push(sendCommandResult);
                        string documentDate = RegexUtils.MatchRtDate(sendCommandResult);
                        int[] documentNumber = RegexUtils.MatchRtDocumentNumber(sendCommandResult);
                        if (documentDate != null) {
                            document.Date = documentDate;
                        }
                        if (documentNumber != null) {
                            document.Closure = documentNumber[0];
                            document.Number = documentNumber[1];
                        }
                        if (RegexUtils.MatchRtDocumentGestionale(sendCommandResult)) {
                            document.IsNotFiscal = true;
                        }
                        if (RegexUtils.MatchRtSerialNumber(sendCommandResult)) {
                            result.Add(document);
                            document = new Document();
                        }
                    });
                    await this.sendCommand(core.Clear());
                    await this.sendCommand(core.Reg());
                    await this.close();
                }
            } catch (e) {
                console.error(e);
                await this.close();
                reject(e)
            }
            resolve(result);
        });
    }

    protected onCommand(buffer: string) {
        this.commandEventListeners.forEach(listner => listner(buffer));
    }

    protected onStatusUpdate(status: number) {
        this.statusEventListeners.forEach(listner => listner(status));
    }
}