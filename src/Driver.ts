import {ComConst} from './ComConst';
import {EcrDevice} from './EcrDevice';
import {IDriver} from './IDriver';
import {IEcrDevice} from './IEcrDevice';
import {Prog} from './models/Prog';
import {RchProtocol} from './protocol/RchProtocol';
import {RchDefault} from './RchDefault';
import {Utils} from './Utils';
import {IProg} from './interfaces/IProg';
import {PrintBillResponseDTO} from './dto/PrintBillResponseDTO';
import {Duplex} from 'stream';
import {RchMessage} from './protocol/RchMessage';
import {PrinterStatus} from './printer/PrinterStatus';
import {DeviceStatus} from './printer/DeviceStatus';
import {DgfeStatus, RTStatus, EthernetSettings, CashRegister} from './printer';
import {DayLightSavingTimeAndPeriodCheck} from './printer/DayLightSavingTimeAndPeriodCheck';
import {InactivityAndPendings} from './printer/InactivityAndPendings';
import {ConnectionConst} from './ConnectionConst';
import {createConnection} from 'net';
import {Crawler} from './network/Crawler';
import { SerialPort } from 'serialport';
import { DateTime } from 'luxon';
import {
	Dgfe,
	Receipt,
	Closure,
	ReceiptItem,
	ReceiptPayment,
	IPayment,
	IDepartment,
	DeviceType,
} from '.';
import {ReceiptItemDiscount} from './ReceiptItemDiscount';
import {ClosureVat} from './ClosureVat';
import {ClosurePayment} from './ClosurePayment';
import {ClosureDiscount} from './ClosureDiscount';
import {ProgCommand} from './models/ProgCommand';
import { DriverConfiguration } from './DriverConfiguration';
import { RegexUtils } from './RegexUtils';
import { BillDTO, Core, RowDTO } from 'rch-driver-js-core';


/**
 * Driver
 * @date 1/11/2022 - 2:22:47 AM
 * 
 * @module rch-driver-js
 * @export
 * @class Driver
 * @typedef {Driver}
 * @implements {IDriver}
 */
export class Driver implements IDriver {
	connection: ConnectionConst = ConnectionConst.TCPIP;
	comPort?: string = 'COM3';
	baudRate?: number = 9600;
	ip?: string = '192.168.1.10';
	ipPort?: number = 23;
	packIds: string = '01234567879abcdefghijklmnopqrstuvwxyzaABCDEFGHIJKLMNOPQRSTUVWXYZ';
	packId: number = 0;
	commandEventListeners: Function[] = [];
	isETX = false;
	buffer: number[] = [];
	sessionCommands: {[key: string]: RchProtocol[]} = {};
	logTag: string = '[Driver]: ';
	client: Duplex | null = null;
	core: Core = new Core();

	/**
	 * Creates an instance of Driver.
	 * @date 1/11/2022 - 3:58:28 PM
	 */
	constructor() {}

	/**
	 * @inheritdoc
	 */
	buildProgCommands(prog: IProg, printerType: DeviceType, sendHeadings: boolean): ProgCommand[] {
		var core = new Core();
		var commands: ProgCommand[] = [];
		commands.push({
			description: 'Clear',
			cmd: core.clear(),
		});
		commands.push({
			description: 'Chiave programmazioni',
			cmd: core.prg(),
		});

		if (printerType == DeviceType.PRINTF) {
			var midnightAlert = {
				description: 'Avviso di mezzanotte',
			} as ProgCommand;
			midnightAlert.cmd = core.C126(prog.midnightAlert);
			commands.push(midnightAlert);

			var printECRNum = {
				description: 'Numero ECR',
			} as ProgCommand;
			printECRNum.cmd = core.C132(prog.printECRNum);
			commands.push(printECRNum);

			var invoiceSubtotal = {
				description: 'Fattura subtotale',
			} as ProgCommand;
			invoiceSubtotal.cmd = core.C133(prog.invoiceSubtotal);
			commands.push(invoiceSubtotal);

			var showChange = {
				description: 'Mostra resto',
			} as ProgCommand;
			showChange.cmd = core.C136(prog.showChange);
			commands.push(showChange);

			var c917 = {
				description: 'Impostazioni fattura',
			} as ProgCommand;
			c917.cmd = core.C917(prog.intInvoice, prog.invoice2Lines, prog.invoiceSubtotal, prog.invoiceClientCheck, true);
			commands.push(c917);

			if (prog.singleQuantity) {
				commands.push({
					description: 'Stampa singola quantità',
					cmd: core.C927(prog.singleQuantity, prog.singleQuantity),
				});
			} else {
				commands.push({
					description: 'Stampa singola quantità',
					error: 'manca valore',
				});
			}
			if (prog.printBuffer) {
				commands.push({
					description: 'Abilitazione buffer',
					cmd: core.C932(prog.printBuffer),
				});
			} else {
				commands.push({
					description: 'Abilitazione buffer',
					error: 'manca valore',
				});
			}
			if (prog.cutter) {
				commands.push({
					description: 'Abilitazione taglierina',
					cmd: core.C997(prog.cutter),
				});
			} else {
				commands.push({
					description: 'Abilitazione taglierina',
					error: 'manca valore',
				});
			}
			for (var i = 0; i < prog.invoiceText.length; i++) {
				commands.push({
					description: 'Intestazione fattura, riga ' + prog.invoiceText[i].id,
					cmd: '>C918/*1/$' + prog.invoiceText[i].id + '/(' + prog.invoiceText[i].name + ')',
				});
			}
		}

		var availableClerks = printerType == DeviceType.LDP33RT ? prog.operators.slice(0, 4) : printerType == DeviceType.ONDART || printerType == DeviceType.ONDARTA || printerType == DeviceType.SPOTRT ? prog.operators.slice(0, 4) : prog.operators;

		availableClerks.forEach((item) => {
			if (item.name != '' && item.name != null) {
				commands.push({
					description: 'Operatore ' + item.id + ' ' + item.name,
					cmd: core.O(item.id, item.name),
				});
			}
		});

		var availableDepts = printerType == DeviceType.LDP03 ? prog.departments.slice(0, 10) : printerType == DeviceType.ONDART || printerType == DeviceType.ONDARTA || printerType == DeviceType.SPOTRT ? prog.departments.slice(0, 10) : prog.departments;

		availableDepts.forEach((item) => {
			if (this.validateDepartment(prog, item)) {
				commands.push({
					description: 'Reparto ' + item.id + ' (' + item.name + ')',
					cmd: core.R(item.id, item.price, item.vatCode, item.name, item.halo, item.lalo, item.single, item.groupCode, item.departmentType),
				});
			} else {
				commands.push({
					description: 'Reparto ' + item.id + ' (' + item.name + ')',
					error: 'reparto non valido',
				});
			}
		});

		var availablePayments = printerType == DeviceType.LDP33RT ? prog.payments.slice(0, 10) : printerType == DeviceType.ONDART || printerType == DeviceType.ONDARTA || printerType == DeviceType.SPOTRT ? prog.payments.slice(0, 10) : prog.payments;

		availablePayments.forEach((item) => {
			if (this.validateTender(item)) {
				commands.push({
					description: 'Pagamento ' + item.id + ' ' + item.name,
					cmd: core.T(item.id, item.name, item.change, item.cash, item.payDiscount, item.creditType, item.drawer, item.inputTotalAmount, item.ticket),
				});
			} else {
				commands.push({
					description: 'Pagamento ' + item.id + ' ' + item.name,
					error: 'pagamento non valido',
				});
			}
		});

		var availableVats = printerType == DeviceType.LDP33RT ? prog.vats.slice(0, 13) : printerType == DeviceType.ONDART || printerType == DeviceType.ONDARTA || printerType == DeviceType.SPOTRT ? prog.vats.slice(0, 13) : prog.vats;

		availableVats.forEach((item) => {
			commands.push({
				description: 'IVA ' + item.id,
				cmd: core.V(item.id, item.type, item.value != undefined ? item.value : 0, item.ateco),
			});
		});
		if (sendHeadings) {
			var availbleHeadings = printerType == DeviceType.PRINTF ? prog.headings : prog.headings.slice(0, 6);

			availbleHeadings.forEach((item) => {
				commands.push({
					description: 'Intestazione ' + item.id,
					cmd: core.H(item.id, item.name ?? ''),
				});
			});
		}
		prog.courtesyLines.forEach((item) => {
			commands.push({
				description: 'Riga di cortesia ' + item.id,
				cmd: core.t(item.id, item.name),
			});
		});

		commands.push({
			description: 'Clear',
			cmd: core.clear(),
		});
		commands.push({
			description: 'Chiave registratore',
			cmd: core.reg(),
		});
		return commands;
	}

	private validateTender(item: IPayment): boolean {
		return !(!item.cash && !item.credit && !item.payDiscount && !item.ticket && item.creditType != 0);
	}

	private validateDepartment(prog: IProg, item: IDepartment): boolean {
		return !((item.departmentType == 1 && prog.vats!.find((v) => v.id == item.vatCode)?.type == 'VI') ?? false);
	}

	private async initConnection(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			switch (this.connection) {
				case ConnectionConst.SERIAL:
					if (this.comPort && this.baudRate) {
						this.client = new SerialPort({
							path: this.comPort,
							baudRate: this.baudRate,
							autoOpen: false,
						});
						this.client?.on('close', () => {
							console.log(this.logTag + 'connection closed');
						});
						this.client.once('error', (error) => {
							console.error(error);
							this.client?.end();
							reject(false);
						});
						this.client.once('open', () => {
							console.log(this.logTag + 'connection open');
							this.client?.removeAllListeners('error');
							this.client?.on('error', (error) => {
								console.error(error);
							});
							resolve(true);
						});
						(this.client as SerialPort).open((err) => {
							console.error(err);
							this.client?.end();
							reject(false);
						});
					} else {
						reject(false);
					}
					break;
				case ConnectionConst.TCPIP:
				default:
					if (this.ip && this.ipPort) {
						this.client = createConnection(this.ipPort, this.ip, () => {
							console.log(this.logTag + 'connection open');
							this.client?.removeAllListeners('error');
							this.client?.on('error', (error) => {
								console.error(error);
								this.client?.end();
							});
							resolve(true);
						});
						this.client?.on('close', () => {
							console.log(this.logTag + 'connection closed');
						});
						this.client.once('error', (error) => {
							console.error(error);
							this.client?.end();
							reject(false);
						});
					} else {
						reject(false);
					}
					break;
			}
		});
	}

	/**
	 * @inheritdoc
	 */
	async open(configuration: DriverConfiguration): Promise<boolean> {
		this.connection = configuration.connection;
		this.ip = configuration.ip;
		this.ipPort = configuration.ipPort;
		this.comPort = configuration.comPort;
		this.baudRate = configuration.baudRate;
		return await this.initConnection();
	}

	/**
	 * @inheritdoc
	 */
	close(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				if (this.client && !this.client.destroyed) {
					this.client?.destroy();
				}
				resolve(true);
			} catch (e) {
				console.error(this.logTag + e);
				reject(e);
			}
		});
	}

	/**
	 * @inheritdoc
	 */
	async discovery(): Promise<IEcrDevice[]> {
		let result: IEcrDevice[] = [];
		try {
			this.connection = ConnectionConst.SERIAL;
			let ports = await SerialPort.list();
			for (let i = 0; i < ports.length; i++) {
				let port = ports[i];
				let device = new EcrDevice();
				device.baudRate = 9600;
				device.comPort = port.path;
				this.comPort = port.path;
				this.baudRate = 9600;
				console.debug(this.logTag + '#discovery on Serial Port: ' + port.path);
				try {
					let d = await this.populateDevice(device);
					if (d != null) {
						console.debug(d);
						result.push(d);
					} else {
						console.debug(this.logTag + '#discovery Device Not Found on Serial Port: ' + port.path);
					}
				} catch (pe) {
					console.error(this.logTag + '#discovery ' + pe);
				}
			}
		} catch (e) {
			console.error(this.logTag + '#discovery ' + e);
		}
		try {
			this.connection = ConnectionConst.TCPIP;
			let devices = await Crawler.ping_all();
			for (let i = 0; i < devices.length; i++) {
				let device = devices[i];
				device.ipPort = 23;
				this.ip = device.ip;
				this.ipPort = 23;
				try {
					console.debug(this.logTag + '#discovery on TCP/IP: ' + device.ip);
					let d = await this.populateDevice(device);
					if (d != null) {
						console.debug(d);
						result.push(d);
					} else {
						console.debug(this.logTag + '#discovery Device Not Found on TCP/IP: ' + device.ip);
					}
				} catch (pe) {
					console.error(this.logTag + '#discovery ' + pe);
				}
			}
		} catch (e) {
			console.error(this.logTag + '#discovery ' + e);
		}

		return result;
	}

	/**
	 * @inheritdoc
	 */
	async discoverByIp(ip: string): Promise<IEcrDevice | null> {
		let result: IEcrDevice | null= null;
		try {
			this.connection = ConnectionConst.TCPIP;
			let device = new EcrDevice();
			device.ipPort = 23;
			device.ip = ip;
			this.ip = ip;
			this.ipPort = 23;
			try {
				console.debug(this.logTag + '#discovery on TCP/IP: ' + device.ip);
				let d = await this.populateDevice(device);
				if (d != null) {
					console.debug(d);
					result = d;
				} else {
					console.debug(this.logTag + '#discovery Device Not Found on TCP/IP: ' + device.ip);
				}
			} catch (pe) {
				console.error(this.logTag + '#discovery ' + pe);
			}
		} catch (e) {
			console.error(this.logTag + '#discovery ' + e);
		}

		return result;
	}

	/**
	 * @inheritdoc
	 */
	addCommandEventListener(listner: Function): Function {
		this.commandEventListeners.push(listner);
		return () => {
			this.commandEventListeners.splice(this.commandEventListeners.indexOf(listner), 1);
		};
	}

	/**
	 * @inheritdoc
	 */
	sendCommand(command: string): Promise<RchProtocol> {
		return new Promise((resolve, reject) => {
			let result: RchProtocol;
			try {
				let bytesRead = 0;
				let onDataListener = (data: Buffer) => {
					try {
						bytesRead = data.buffer.byteLength;
						if (bytesRead > 0) {
							let dataRead = this.readData(Buffer.from(data.toString(), 'ascii'));
							if (dataRead.length > 0) {
								result.response = result.response.concat(dataRead.map((d) => new RchMessage(d)));
							}
						}
					} catch {
						bytesRead = 0;
					}

					if (this.isETX) {
						this.onCommand(result);
						resolve(result);
					} else {
						this.client?.once('data', onDataListener);
					}
				};
				this.client?.once('data', onDataListener);

				let byteSend = this.formatCommandToByteArray(command);
				let bufferSend = Buffer.from(byteSend);
				result = new RchProtocol(bufferSend.slice(1, bufferSend.length - 1).toString('ascii'));

				this.client?.write(bufferSend, 'ascii', (error) => {
					if (error) {
						reject(error.message);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * @inheritdoc
	 */
	async sendCommands(commands: string[]): Promise<Array<RchProtocol>> {
		let results: Array<RchProtocol> = [];
		try {
			for (let i = 0; i < commands.length; i++) {
				results = results.concat(await this.sendCommand(commands[i]));
			}
		} catch (e) {
			console.log(e);
		}
		return results;
	}

	/**
	 * @inheritdoc
	 */
	formatCommandToByteArray(command: string): number[] {
		let result: number[] = [];
		this.packId = this.packId == this.packIds.length - 1 ? 0 : this.packId + 1;

		result.push(ComConst.CHR_STX); //<STX>
		result.push(...Buffer.from('01')); //<ADDS>
		result.push(...Buffer.from(command.length.toString().padStart(3, '0'))); //<LUNGH>
		result.push(...Buffer.from(ComConst.CHR_NUOVOPROTOCOLLO)); //<PROT-ID>
		result.push(...Buffer.from(command)); //<DATI>
		result.push(this.packIds.charCodeAt(this.packId)); //<PACK-ID>
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
			if (await this.initConnection()) {
				let rchDefaults = new RchDefault();

				let sendCommandResult = await this.sendCommand(this.core.getSerialNumber());

				if (sendCommandResult.isSuccess) {
					let response = sendCommandResult.response[0];

					if (!response.isError) {
						device.serialNumber = Utils.toRtFormat(response.data.replace(/[ ]/, ''));
						device.type = DeviceType.fromSerialNumber(device.serialNumber);

						let fwRevisionResult = await this.sendCommand(this.core.getFirmwareRevision());
						if (fwRevisionResult.isSuccess) {
							device.fwVersionLabel = fwRevisionResult.response[0].data;
						}

						let deviceCapability = rchDefaults.getDeviceCapability(device.type, device.fwVersion);

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
						await this.close();
						return device;
					}
				}
			}
		} catch (e) {
			console.error(this.logTag + '#populateDevice ' + e);
		}
		await this.close();
		return null;
	}

	/**
	 * @inheritdoc
	 */
	async dumpDGFE(from: Date, to: Date): Promise<Dgfe> {
		let dgfe = {} as Dgfe;
		dgfe.from = from;
		dgfe.to = to;
		dgfe.closures = [];
		dgfe.receipts = [];

		try {
			await this.sendCommand(this.core.z());
			let sendCommandResult = await this.sendCommand(this.core.C451(from, to));
			if (sendCommandResult.isSuccess) {
				let rows = sendCommandResult.responseBody.join('\n');
				let m;

				while ((m = RegexUtils.fiscalDocumentPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
						RegexUtils.fiscalDocumentPattern.lastIndex++;
					}

					let receipt = new Receipt();
					let groups = m.groups;
					if (groups) {
						dgfe.receipts.push(this.fillReceipt(groups, receipt));
					}
				}

				while ((m = RegexUtils.fiscalReportPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalReportPattern.lastIndex) {
						RegexUtils.fiscalReportPattern.lastIndex++;
					}

					let closure = new Closure();
					let groups = m.groups;
					if (groups) {
						closure.raw = groups['raw'];
						closure.date = DateTime.fromFormat(groups['datetime'], 'dd-LL-yyyy HH:mm', {locale: 'it-IT'}).toJSDate();
						closure.closure = parseInt(groups['closure']);
						closure.number = parseInt(groups['number']);
						if (groups['sells']) {
							closure.sells = parseInt(groups['sells']);
						}
						if (groups['grandTotal']) {
							closure.grandTotal = parseInt(groups['grandTotal'].replace(/[\.,]/g, ''));
						}
						if (groups['invoices']) {
							closure.invoices = parseInt(groups['invoices']);
						}
						if (groups['invoicesTotal']) {
							closure.invoicesTotal = parseInt(groups['invoicesTotal'].replace(/[\.,]/g, ''));
						}
						if (groups['cancelledDocumentsTotal']) {
							closure.cancelledDocumentsTotal = parseInt(groups['cancelledDocumentsTotal'].replace(/[\.,]/g, ''));
						}
						if (groups['fiscalDocuments']) {
							closure.fiscalDocuments = parseInt(groups['fiscalDocuments']);
						}
						if (groups['managementDocuments']) {
							closure.managementDocuments = parseInt(groups['managementDocuments']);
						}
						if (groups['summaryReadings']) {
							closure.summaryReadings = parseInt(groups['summaryReadings']);
						}
						if (groups['restores']) {
							closure.restores = parseInt(groups['restores']);
						}
						if (groups['dgfeNumber']) {
							closure.dgfeNumber = parseInt(groups['dgfeNumber']);
						}
						if (groups['fiscalSeal']) {
							closure.fiscalSeal = groups['fiscalSeal'];
						}
						if (groups['vats']) {
							let vats = groups['vats'];
							let vm;
							while ((vm = RegexUtils.fiscalReportVatDetailsPattern.exec(vats)) !== null) {
								if (vm.index === RegexUtils.fiscalReportPattern.lastIndex) {
									RegexUtils.fiscalReportPattern.lastIndex++;
								}
								let vatGroups = vm.groups;
								if (vatGroups) {
									let closureVat = new ClosureVat();
									closureVat.id = parseInt(vatGroups['id']);
									closureVat.vat = vatGroups['vat'];
									if (vatGroups['total']) {
										closureVat.total = parseInt(vatGroups['total'].replace(/[\.,]/g, ''));
									}
									if (vatGroups['sellsGrandTotal']) {
										closureVat.sellsGrandTotal = parseInt(vatGroups['sellsGrandTotal'].replace(/[\.,]/g, ''));
									}
									if (vatGroups['sellsNetTotal']) {
										closureVat.sellsNetTotal = parseInt(vatGroups['sellsNetTotal'].replace(/[\.,]/g, ''));
									}
									if (vatGroups['sellsVatTotal']) {
										closureVat.sellsVatTotal = parseInt(vatGroups['sellsVatTotal'].replace(/[\.,]/g, ''));
									}
									closure.vats.push(closureVat);
								}
							}
						}
						if (groups['payments']) {
							let payments = groups['payments'];
							let pm;
							while ((pm = RegexUtils.fiscalReportPaymentDetailsPattern.exec(payments)) !== null) {
								if (pm.index === RegexUtils.fiscalReportPaymentDetailsPattern.lastIndex) {
									RegexUtils.fiscalReportPaymentDetailsPattern.lastIndex++;
								}
								let paymentGroups = pm.groups;
								if (paymentGroups) {
									let clousurePayment = new ClosurePayment();
									clousurePayment.description = paymentGroups['description'];
									if (paymentGroups['value']) {
										clousurePayment.value = parseInt(paymentGroups['value'].replace(/[\.,]/g, ''));
									}
									closure.payments.push(clousurePayment);
								}
							}
						}
						if (groups['discounts']) {
							let discounts = groups['discounts'];
							let dm;
							while ((dm = RegexUtils.fiscalReportDiscountDetailsPattern.exec(discounts)) !== null) {
								if (dm.index === RegexUtils.fiscalReportDiscountDetailsPattern.lastIndex) {
									RegexUtils.fiscalReportDiscountDetailsPattern.lastIndex++;
								}
								let discountGroups = dm.groups;
								if (discountGroups) {
									let clousureDiscount = new ClosureDiscount();
									if (discountGroups['isPerc']) {
										clousureDiscount.isPerc = true;
									}
									if (discountGroups['value']) {
										clousureDiscount.value = parseInt(discountGroups['value'].replace(/[\.,]/g, ''));
									}
									closure.discounts.push(clousureDiscount);
								}
							}
						}

						dgfe.closures.push(closure);
					}
				}
			}
			await this.sendCommand(this.core.reg());
			await this.sendCommand(this.core.clear());
		} catch (e) {
			console.error(e);
		}
		return dgfe;
	}

	/**
	 * @inheritdoc
	 */
	async getLastReceipt(): Promise<Receipt> {
		let result = {} as Receipt;

		try {
			await this.sendCommand(this.core.prg());
			let sendCommandResult = await this.sendCommand(this.core.getLastReceipt());
			if (sendCommandResult.isSuccess) {
				let rows = sendCommandResult.responseBody.join('\n');

				let m;

				while ((m = RegexUtils.fiscalDocumentPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
						RegexUtils.fiscalDocumentPattern.lastIndex++;
					}

					let receipt = new Receipt();
					let groups = m.groups;
					if (groups) {
						result = this.fillReceipt(groups, receipt);
					}
				}
			}
			await this.sendCommand(this.core.reg());
		} catch (e) {
			console.error(e);
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	private fillReceipt(groups: {[key: string]: string}, receipt: Receipt): Receipt {
		receipt.raw = groups['raw'];
		receipt.date = DateTime.fromFormat(groups['datetime'], 'dd-LL-yyyy HH:mm', {
			locale: 'it-IT',
		}).toJSDate();
		receipt.closure = parseInt(groups['closure']);
		receipt.number = parseInt(groups['number']);
		if (groups['grandTotal']) {
			receipt.grandTotal = parseInt(groups['grandTotal'].replace(/[\.,]/g, ''));
		}
		if (groups['vatTotal']) {
			receipt.vatTotal = parseInt(groups['vatTotal'].replace(/[\.,]/g, ''));
		}
		if (groups['paymentTotal']) {
			receipt.paymentTotal = parseInt(groups['paymentTotal'].replace(/[\.,]/g, ''));
		}
		if (groups['items']) {
			let items = groups['items'];
			let m;
			while ((m = RegexUtils.fiscalDocumentItemsPattern.exec(items)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
					RegexUtils.fiscalDocumentPattern.lastIndex++;
				}
				let itemGroups = m.groups;
				if (itemGroups) {
					let item = {} as ReceiptItem;
					item.description = itemGroups['description'];
					if (itemGroups['vat']) {
						item.vat = parseInt(itemGroups['vat']);
					}
					if (itemGroups['nature']) {
						item.nature = itemGroups['nature'];
					}
					item.value = parseInt(itemGroups['value'].replace(/[\.,]/g, ''));
					if (itemGroups['qty']) {
						item.qty = parseInt(itemGroups['qty']);
					}
					if (itemGroups['unitValue']) {
						item.unitValue = parseInt(itemGroups['unitValue'].replace(/[\.,]/g, ''));
					}
					if (itemGroups['discountDescription'] && itemGroups['discountPerc']) {
						item.discount = {
							description: itemGroups['discountDescription'],
							percentage: parseInt(itemGroups['discountPerc']),
						} as ReceiptItemDiscount;
						if (itemGroups['discountVat']) {
							item.discount.vat = parseInt(itemGroups['discountVat']);
						}
						if (itemGroups['discountNature']) {
							item.discount.nature = itemGroups['discountNature'];
						}
					}
					if (itemGroups['discountDescription'] && itemGroups['discountValue']) {
						item.discount = {
							description: itemGroups['discountDescription'],
							value: parseInt(itemGroups['discountValue'].replace(/[\.,]/g, '')),
						} as ReceiptItemDiscount;
						if (itemGroups['discountVat']) {
							item.discount.vat = parseInt(itemGroups['discountVat']);
						}
						if (itemGroups['discountNature']) {
							item.discount.nature = itemGroups['discountNature'];
						}
					}
					receipt.items.push(item);
				}
			}
		}
		if (groups['payments']) {
			let payments = groups['payments'];
			let m;
			while ((m = RegexUtils.fiscalDocumentPaymentsPattern.exec(payments)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
					RegexUtils.fiscalDocumentPattern.lastIndex++;
				}
				let paymentsGroups = m.groups;
				if (paymentsGroups) {
					let payment = {} as ReceiptPayment;
					payment.description = paymentsGroups['description'];
					payment.value = parseInt(paymentsGroups['value'].replace(/[\.,]/g, ''));
					receipt.payments.push(payment);
				}
			}
		}
		return receipt;
	}

	/**
	 * @inheritdoc
	 */
	async allProgramming(): Promise<IProg | null> {
		try {
			await this.sendCommand(this.core.clear());
			await this.sendCommand(this.core.prg());
			let result = await this.sendCommand(this.core.allProgramming());
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

	/**
	 * @inheritdoc
	 */
	async printReceipt(bill: BillDTO, printDepartmentSubtotal: boolean = false, dumpResultFromDgfe: boolean = false): Promise<PrintBillResponseDTO> {
		let result = {} as PrintBillResponseDTO;
		try {
			let commands: string[] = [];
			commands.push(this.core.clear());
			if (bill.isReturn && bill.returnInfo) {
				commands.push(this.core.returnGoodsFromDTO(bill.returnInfo));
			}
			if (bill.isCancel && bill.returnInfo) {
				commands.push(this.core.returnReceiptFromDTO(bill.returnInfo));
			} else {
				if (bill.textBefore) {
					bill.textBefore.forEach((item) => {
						commands.push(this.core.printRowBeforeFiscalContent(item));
					});
				}
				if (printDepartmentSubtotal) {
					let billItemsGrouped = bill.lineItems.groupBy((l) => l.departmentId);
					let keys = Object.keys(billItemsGrouped);
					keys.forEach((key) => {
						billItemsGrouped[key].forEach((item) => {
							commands.push(this.core.departmentSellFromLineItem(item));
							if (item.discount) {
								if (item.discount.percent) {
									commands.push(this.core.discountPercentage(item.discount.percent, item.discount.description));
								} else if (item.discount.value) {
									commands.push(this.core.discountValue(item.discount.value, item.discount.description));
								}
							}
						});
						commands.push(this.core.subtotal());
					});
				} else {
					bill.lineItems.forEach((item) => {
						commands.push(this.core.departmentSellFromLineItem(item));
						if (item.discount) {
							if (item.discount.percent) {
								commands.push(this.core.discountPercentage(item.discount.percent, item.discount.description));
							} else if (item.discount.value) {
								commands.push(this.core.discountValue(item.discount.value, item.discount.description));
							}
						}
					});
				}
				if (bill.lotteryCode) {
					commands.push(this.core.lottery(bill.lotteryCode));
				}
			}
			if (bill.paymentItems && !bill.isReturn && !bill.isCancel) {
				bill.paymentItems.forEach(async (item) => {
					commands.push(this.core.paymentFromPaymentItem(item));
				});
			} else {
				commands.push(this.core.cmd('=T1'));
			}
			if (bill.textAfter) {
				bill.textAfter.forEach((item) => {
					commands.push(this.core.printRowAfterTotal(item));
				});
			}
			commands.push(this.core.closeReceipt());
			commands.push(this.core.terminateOperation());
			commands.push(this.core.clear());
			let sendCommandsResult = await this.sendCommands(commands);

			if (dumpResultFromDgfe && sendCommandsResult.map((s) => s.isSuccess).reduce((previous, current) => previous && current, true)) {
				result.receipt = await this.getLastReceipt();
			}
		} catch (e) {
			console.error(e);
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	async zReport(): Promise<boolean> {
		try {
			let commands: string[] = [];
			commands.push(this.core.clear());
			commands.push(this.core.z());
			commands.push(this.core.zReport());
			commands.push(this.core.reg());
			commands.push(this.core.clear());
			let sendCommandsResult = await this.sendCommands(commands);
			let result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	/**
	 * @inheritdoc
	 */
	async xReport(): Promise<boolean> {
		try {
			let commands: string[] = [];
			commands.push(this.core.clear());
			commands.push(this.core.x());
			commands.push(this.core.xReport());
			commands.push(this.core.reg());
			commands.push(this.core.clear());
			let sendCommandsResult = await this.sendCommands(commands);
			let result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	/**
	 * @inheritdoc
	 */
	async print(rows: string[] | RowDTO[], cutPaper: boolean = false, header: boolean = false): Promise<boolean> {
		try {
			let commands: string[] = [];
			commands.push(this.core.clear());
			commands.push(this.core.reg());
			commands.push(this.core.openNonFiscalReceipt(cutPaper, header));
			rows.forEach((row: string | RowDTO) => {
				commands.push(this.core.printRow(row));
			});
			commands.push(this.core.closeNonFiscalReceipt());
			commands.push(this.core.closeReceipt());
			commands.push(this.core.terminateOperation());
			commands.push(this.core.clear());
			let sendCommandsResult = await this.sendCommands(commands);
			let result = sendCommandsResult.reduce((previous, current) => previous && current.isSuccess, true);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getDeviceStatus(): Promise<DeviceStatus | null> {
		try {
			let result = await this.sendCommand(this.core.deviceStatus());
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

	/**
	 * @inheritdoc
	 */
	async getCurrentDateTime(): Promise<Date | null> {
		try {
			let result = await this.sendCommand(this.core.getCurrentDateTime());
			if (result.isSuccess) {
				return DateTime.fromFormat(result.response[0].data, 'dd/LL/yyyy HH:mm:ss').toJSDate();
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	async getCurrentSubTotal(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getCurrentSubTotal());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getFwVersion(): Promise<string | null> {
		try {
			let result = await this.sendCommand(this.core.getFirmwareRevision());
			if (result.isSuccess) {
				return result.response[0].data;
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getSerialNumber(): Promise<string | null> {
		try {
			let result = await this.sendCommand(this.core.getSerialNumber());
			if (result.isSuccess) {
				return Utils.toRtFormat(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getCorrispettivoFiscale(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getCorrispettivoFiscale());
			if (result.isSuccess) {
				return parseInt(result.response[0].data.replace(/[\.,]/g, ''));
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getTotalReturns(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getTotalReturns());
			if (result.isSuccess) {
				return parseInt(result.response[0].data.replace(/[\.,]/g, ''));
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getTotalCancelled(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getTotalCancelled());
			if (result.isSuccess) {
				return parseInt(result.response[0].data.replace(/[\.,]/g, ''));
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getTotalCredits(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getTotalCredits());
			if (result.isSuccess) {
				return parseInt(result.response[0].data.replace(/[\.,]/g, ''));
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getTotalZeroingNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getTotalZeroingNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getGrandTotal(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getGrandTotal());
			if (result.isSuccess) {
				return parseInt(result.response[0].data.replace(/[\.,]/g, ''));
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getHwInitNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getHwInitNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getLastNotFiscalDocumentNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getLastNotFiscalDocumentNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getCashierNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getCashierNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getLastInvoiceNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getLastInvoiceNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getDailyCreditNoteNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getDailyCreditNoteNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getAnnualCreditNoteNumber(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.getAnnualCreditNoteNumber());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getDgfeStatus(): Promise<DgfeStatus | null> {
		try {
			let result = await this.sendCommand(this.core.dgfeStatus());
			if (result.isSuccess) {
				let dgfeStatus = parseInt(result.response[0].data);
				if (dgfeStatus == 1) return DgfeStatus.FULL;
				else if (dgfeStatus == 10) return DgfeStatus.WARNING;
				else return DgfeStatus.OK;
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getDgfeFreeSpace(): Promise<number | null> {
		try {
			let result = await this.sendCommand(this.core.dgfeFreeSpace());
			if (result.isSuccess) {
				return parseInt(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getDayLightSavingTimeAndPeriodCheck(): Promise<DayLightSavingTimeAndPeriodCheck | null> {
		try {
			let result = await this.sendCommand(this.core.periodicAssessmentStatus());
			if (result.isSuccess) {
				return new DayLightSavingTimeAndPeriodCheck(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getPrinterStatus(): Promise<PrinterStatus | null> {
		try {
			let result = await this.sendCommand(this.core.printerStatus());
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

	/**
	 * @inheritdoc
	 */
	async getRtStatus(): Promise<RTStatus | null> {
		try {
			let result = await this.sendCommand(this.core.rtStatus());
			if (result.isSuccess) {
				return new RTStatus(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getInactivityAndPendings(): Promise<InactivityAndPendings | null> {
		try {
			let result = await this.sendCommand(this.core.inactivityAndPendings());
			if (result.isSuccess) {
				return new InactivityAndPendings(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getCommisioningDate(): Promise<Date | null> {
		try {
			let result = await this.sendCommand(this.core.inServiceStatus());
			if (result.isSuccess) {
				return DateTime.fromFormat(result.response[0].data, 'yyyy/LL/dd').toJSDate();
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getEthernetSettings(): Promise<EthernetSettings | null> {
		try {
			let result = await this.sendCommand(this.core.getEthernetSettings());
			if (result.isSuccess) {
				return new EthernetSettings(result.response[0].data);
			} else {
				return null;
			}
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @inheritdoc
	 */
	async getCashRegisterData(): Promise<CashRegister | null> {
		try {
			let result = {} as CashRegister;
			result.deviceStatus = (await this.getDeviceStatus()) ?? undefined;
			result.dateTime = (await this.getCurrentDateTime()) ?? undefined;
			result.subtotal = (await this.getCurrentSubTotal()) ?? undefined;
			result.fwVersion = (await this.getFwVersion()) ?? undefined;
			result.serialNumber = (await this.getSerialNumber()) ?? undefined;
			result.corrispettivoFiscale = (await this.getCorrispettivoFiscale()) ?? undefined;
			result.totalReturns = (await this.getTotalReturns()) ?? undefined;
			result.totalCancelled = (await this.getTotalCancelled()) ?? undefined;
			result.totalCredits = (await this.getTotalCredits()) ?? undefined;
			result.totalZeroingNumber = (await this.getTotalZeroingNumber()) ?? undefined;
			result.grandTotal = (await this.getGrandTotal()) ?? undefined;
			result.hwInitNumber = (await this.getHwInitNumber()) ?? undefined;
			result.lastNotFiscalDocumentNumber = (await this.getLastNotFiscalDocumentNumber()) ?? undefined;
			result.cashierNumber = (await this.getCashierNumber()) ?? undefined;
			result.lastInvoiceNumber = (await this.getLastInvoiceNumber()) ?? undefined;
			result.dailyCreditNoteNumber = (await this.getDailyCreditNoteNumber()) ?? undefined;
			result.annualCreditNoteNumber = (await this.getAnnualCreditNoteNumber()) ?? undefined;
			result.dgfeStatus = (await this.getDgfeStatus()) ?? undefined;
			result.dgfeFreeSpace = (await this.getDgfeFreeSpace()) ?? undefined;
			let dayLightSavingTimeAndPeriodCheck = await this.getDayLightSavingTimeAndPeriodCheck();
			if (dayLightSavingTimeAndPeriodCheck) {
				result.daylightSavingTime = dayLightSavingTimeAndPeriodCheck.daylightSavingTime;
				result.periodicCheck = dayLightSavingTimeAndPeriodCheck.periodicCheck;
			}
			result.printerStatus = (await this.getPrinterStatus()) ?? undefined;
			result.rtStatus = (await this.getRtStatus()) ?? undefined;
			let inactivityAndPendings = await this.getInactivityAndPendings();
			if (inactivityAndPendings) {
				result.inactive = inactivityAndPendings.inactive;
				result.pendingFiles = inactivityAndPendings.pendingFiles;
				result.maxPendingFiles = inactivityAndPendings.maxPendingFiles;
				result.firstPendingFileDateTime = inactivityAndPendings.firstPendingFileDateTime;
			}
			result.commissioningDate = (await this.getCommisioningDate()) ?? undefined;
			result.ethernetSettings = (await this.getEthernetSettings()) ?? undefined;

			return result;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	protected onCommand(rchProtocol: RchProtocol) {
		this.commandEventListeners.forEach((listner) => listner(rchProtocol));
	}

	protected timeout(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	protected readData(bytesRead: Buffer): string[] {
		this.isETX = false;
		let result: string[] = [];

		bytesRead.forEach((b) => {
			if (b != ComConst.CHR_ACK && b != ComConst.CHR_STX && b != ComConst.CHR_ETX && b != ComConst.CHR_LF && b != ComConst.CHR_NACK && b != ComConst.CHR_CR) {
				this.buffer.push(b);
			}
			if (b == ComConst.CHR_CR || b == ComConst.CHR_LF || b == ComConst.CHR_ETX) {
				if (this.buffer.length > 0) {
					let response = Buffer.from(this.buffer).toString('ascii');
					result.push(response);
					this.buffer = [];
				}

				if (b == ComConst.CHR_ETX) {
					this.isETX = true;
				}
			}
		});
		return result;
	}
}
