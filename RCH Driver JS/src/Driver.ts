import {ComConst} from './ComConst';
import {DeviceType} from './DeviceType';
import {EcrDevice} from './EcrDevice';
import {IDriver} from './IDriver';
import {IEcrDevice} from './IEcrDevice';
import {Prog} from './models/Prog';
import {Core} from './protocol/Core';
import {RchProtocol} from './protocol/RchProtocol';
import {RchDefault} from './utils/RchDefault';
import {Utils} from './utils/Utils';
import {Document} from './Document';
import {IProg} from './interfaces/prog';
import {BillDTO} from './dto/BillDTO';
import {PrintBillResponseDTO} from './dto/PrintBillResponseDTO';
import {Duplex} from 'stream';
import {RchMessage} from './protocol/RchMessage';
import {PrinterStatus} from './printer/PrinterStatus';
import {DeviceStatus} from './printer/DeviceStatus';
import {DgfeStatus, RTStatus, EthernetSettings, CashRegister} from './printer';
import {DayLightSavingTimeAndPeriodCheck} from './printer/DayLightSavingTimeAndPeriodCheck';
import {InactivityAndPendings} from './printer/InactivityAndPendings';
import {ConnectionConst} from './ConnectionConst';
import {createConnection, Socket} from 'net';
import {Crawler} from './network/Crawler';
import SerialPort from 'serialport';
import {DateTime} from 'luxon';
import _ from 'lodash';
import {
	Dgfe,
	Receipt,
	RegexUtils,
	Closure,
	ReceiptItem,
	ReceiptPayment,
} from '.';
import {ReceiptItemDiscount} from './ReceiptItemDiscount';

export class Driver implements IDriver {
	connection: string;
	comPort: string = 'COM3';
	baudRate: number = 9600;
	ip: string = '192.168.1.10';
	ipPort: number = 23;
	packIds: string =
		'01234567879abcdefghijklmnopqrstuvwxyzaABCDEFGHIJKLMNOPQRSTUVWXYZ';
	packId: number = 10;
	commandEventListeners: Function[] = [];
	isETX = false;
	buffer: number[] = [];
	sessionCommands: {[key: string]: RchProtocol[]} = {};
	logTag: string = '[Driver]: ';
	client: Duplex | null = null;
	core: Core = new Core();

	constructor(
		connection: string,
		ip: string | null,
		ipPort: number | null,
		comPort: string | null,
		baudRate: number | null
	) {
		this.connection = connection;
		if (ip) this.ip = ip;
		if (ipPort) this.ipPort = ipPort;
		if (comPort) this.comPort = comPort;
		if (baudRate) this.baudRate = baudRate;
	}

	async open(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			var timer = setTimeout(() => {
				console.debug(
					this.logTag + '[ERROR] Attempt at connection exceeded timeout value'
				);
				this.client?.end();
				this.client = null;
				reject(false);
			}, 500);
			switch (this.connection) {
				case ConnectionConst.SERIAL:
					if (this.comPort && this.baudRate) {
						this.client = new SerialPort(this.comPort, {
							baudRate: this.baudRate,
							autoOpen: false,
						});
						this.client?.on('close', () => {
							console.log(this.logTag + 'connection closed');
						});
						this.client.once('error', (error) => {
							console.error(error);
							this.client?.end();
							reject(error);
						});
						this.client.once('open', () => {
							clearTimeout(timer);
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
				case ConnectionConst.TCPIP:
				default:
					this.client = createConnection(this.ipPort, this.ip, () => {
						clearTimeout(timer);
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
						reject(error);
					});
			}
		});
	}

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

	async discovery(): Promise<IEcrDevice[]> {
		var result: IEcrDevice[] = [];
		try {
			this.connection = ConnectionConst.SERIAL;
			var ports = await SerialPort.list();
			for (var i = 0; i < ports.length; i++) {
				var port = ports[i];
				var device = new EcrDevice();
				device.baudRate = 9600;
				device.comPort = port.path;
				this.comPort = port.path;
				this.baudRate = 9600;
				console.debug(this.logTag + '#discovery on Serial Port: ' + port.path);
				try {
					var d = await this.populateDevice(device);
					if (d != null) {
						console.debug(d);
						result.push(d);
					} else {
						console.debug(
							this.logTag +
								'#discovery Device Not Found on Serial Port: ' +
								port.path
						);
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
			var devices = await Crawler.ping_all();
			for (var i = 0; i < devices.length; i++) {
				var device = devices[i];
				device.ipPort = 23;
				this.ip = device.ip;
				this.ipPort = 23;
				try {
					console.debug(this.logTag + '#discovery on TCP/IP: ' + device.ip);
					var d = await this.populateDevice(device);
					if (d != null) {
						console.debug(d);
						result.push(d);
					} else {
						console.debug(
							this.logTag +
								'#discovery Device Not Found on TCP/IP: ' +
								device.ip
						);
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

	addCommandEventListener(listner: Function): Function {
		this.commandEventListeners.push(listner);
		return () => {
			this.commandEventListeners.splice(
				this.commandEventListeners.indexOf(listner),
				1
			);
		};
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
							var dataRead = this.readData(
								Buffer.from(data.toString(), 'ascii')
							);
							if (dataRead.length > 0) {
								result.response = result.response.concat(
									dataRead.map((d) => new RchMessage(d))
								);
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

				var byteSend = this.formatCommandToByteArray(command);
				var bufferSend = Buffer.from(byteSend);
				result = new RchProtocol(
					bufferSend.slice(1, bufferSend.length - 1).toString('ascii')
				);

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

	async sendCommands(commands: string[]): Promise<Array<RchProtocol>> {
		var results: Array<RchProtocol> = [];
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
			if (await this.open()) {
				var rchDefaults = new RchDefault();

				var sendCommandResult = await this.sendCommand(
					this.core.getSerialNumber()
				);

				if (sendCommandResult.isSuccess) {
					var response = sendCommandResult.response[0];

					if (!response.isError) {
						device.serialNumber = Utils.toRtFormat(
							response.data.replace(' ', '')
						);
						device.type = DeviceType.fromSerialNumber(device.serialNumber);

						var fwRevisionResult = await this.sendCommand(
							this.core.getFirmwareRevision()
						);
						if (fwRevisionResult.isSuccess) {
							device.fwVersionLabel = fwRevisionResult.response[0].data;
						}

						var deviceCapability = rchDefaults.getDeviceCapability(
							device.type,
							device.fwVersion
						);

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
								device.prog = rchDefaults.getProgByDevice(
									device.type,
									device.fwVersion
								);
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

	async dumpDGFE(from: Date, to: Date): Promise<Dgfe> {
		let dgfe = {} as Dgfe;
		dgfe.from = from;
		dgfe.to = to;
		dgfe.closures = [];
		dgfe.receipts = [];

		try {
			await this.sendCommand(this.core.prg());
			var sendCommandResult = await this.sendCommand(
				this.core.C451(
					DateTime.fromJSDate(from).toFormat('ddLLyy'),
					DateTime.fromJSDate(to).toFormat('ddLLyy')
				)
			);
			if (sendCommandResult.isSuccess) {
				var rows = sendCommandResult.responseBody.join('\n');
				console.debug(rows);
				let m;

				while ((m = RegexUtils.fiscalDocumentPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
						RegexUtils.fiscalDocumentPattern.lastIndex++;
					}

					var receipt = new Receipt();
					var groups = m.groups;
					if (groups) {
						dgfe.receipts.push(this.fillReceipt(groups, receipt));
					}
				}

				while ((m = RegexUtils.fiscalReportPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalReportPattern.lastIndex) {
						RegexUtils.fiscalReportPattern.lastIndex++;
					}

					var closure = new Closure();
					var groups = m.groups;
					if (groups) {
						closure.raw = groups['raw'];
						closure.date = groups['datetime'];
						closure.closure = parseInt(groups['closure']);
						closure.number = parseInt(groups['number']);
						if (groups['sells']) {
							closure.sells = parseInt(groups['sells']);
						}
						if (groups['grandTotal']) {
							closure.grandTotal = parseFloat(
								groups['grandTotal'].replace(/[,\.]/, '')
							);
						}
						if (groups['invoices']) {
							closure.invoices = parseInt(groups['invoices']);
						}
						if (groups['invoicesTotal']) {
							closure.invoicesTotal = parseFloat(
								groups['invoicesTotal'].replace(/[,\.]/, '')
							);
						}
						if (groups['cancelledDocumentsTotal']) {
							closure.cancelledDocumentsTotal = parseFloat(
								groups['cancelledDocumentsTotal'].replace(/[,\.]/, '')
							);
						}
						if (groups['fiscalDocuments']) {
							closure.fiscalDocuments = parseInt(groups['fiscalDocuments']);
						}
						if (groups['managementDocuments']) {
							closure.managementDocuments = parseInt(
								groups['managementDocuments']
							);
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
							//todo
						}
						if (groups['payments']) {
							//todo
						}
						if (groups['discounts']) {
							//todo
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
	async getLastReceipt(): Promise<Receipt> {
		let result = {} as Receipt;

		try {
			await this.sendCommand(this.core.prg());
			var sendCommandResult = await this.sendCommand(
				this.core.getLastReceipt()
			);
			if (sendCommandResult.isSuccess) {
				var rows = sendCommandResult.responseBody.join('\n');

				let m;

				while ((m = RegexUtils.fiscalDocumentPattern.exec(rows)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
						RegexUtils.fiscalDocumentPattern.lastIndex++;
					}

					var receipt = new Receipt();
					var groups = m.groups;
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

	private fillReceipt(
		groups: {[key: string]: string},
		receipt: Receipt
	): Receipt {
		receipt.raw = groups['raw'];
		receipt.date = groups['datetime'];
		receipt.closure = parseInt(groups['closure']);
		receipt.number = parseInt(groups['number']);
		if (groups['grandTotal']) {
			receipt.grandTotal = parseFloat(
				groups['grandTotal'].replace(/[,\.]/, '')
			);
		}
		if (groups['vatTotal']) {
			receipt.vatTotal = parseFloat(groups['vatTotal'].replace(/[,\.]/, ''));
		}
		if (groups['paymentTotal']) {
			receipt.paymentTotal = parseFloat(
				groups['paymentTotal'].replace(/[,\.]/, '')
			);
		}
		if (groups['items']) {
			let items = groups['items'];
			let m;
			while ((m = RegexUtils.fiscalDocumentItemsPattern.exec(items)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
					RegexUtils.fiscalDocumentPattern.lastIndex++;
				}
				var itemGroups = m.groups;
				if (itemGroups) {
					var item = {} as ReceiptItem;
					item.description = itemGroups['description'];
					if (itemGroups['vat']) {
						item.vat = parseInt(itemGroups['vat']);
					}
					if (itemGroups['nature']) {
						item.nature = itemGroups['nature'];
					}
					item.value = parseFloat(itemGroups['value'].replace(/[,\.]/, ''));
					if (itemGroups['qty']) {
						item.qty = parseInt(itemGroups['qty']);
					}
					if (itemGroups['unitValue']) {
						item.unitValue = parseFloat(
							itemGroups['unitValue'].replace(/[,\.]/, '')
						);
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
					if (
						itemGroups['discountDescription'] &&
						itemGroups['discountValue']
					) {
						item.discount = {
							description: itemGroups['discountDescription'],
							value: parseFloat(
								itemGroups['discountValue'].replace(/[,\.]/, '')
							),
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
			while (
				(m = RegexUtils.fiscalDocumentPaymentsPattern.exec(payments)) !== null
			) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === RegexUtils.fiscalDocumentPattern.lastIndex) {
					RegexUtils.fiscalDocumentPattern.lastIndex++;
				}
				var paymentsGroups = m.groups;
				if (paymentsGroups) {
					var payment = {} as ReceiptPayment;
					payment.description = paymentsGroups['description'];
					payment.value = parseFloat(
						paymentsGroups['value'].replace(/[,\.]/, '')
					);
					receipt.payments.push(payment);
				}
			}
		}
		return receipt;
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

	async printReceipt(
		bill: BillDTO,
		printDepartmentSubtotal: boolean = false,
		dumpResultFromDgfe: boolean = false
	): Promise<PrintBillResponseDTO> {
		var result = {} as PrintBillResponseDTO;
		try {
			var commands: string[] = [];
			commands.push(this.core.clear());
			if (bill.textBefore) {
				bill.textBefore.forEach((item) => {
					commands.push(this.core.printRowBeforeFiscalContent(item));
				});
			}
			if (printDepartmentSubtotal) {
				var billItemsGrouped = _.groupBy(bill.lineItems, (l) => l.departmentId);
				var keys = Object.keys(billItemsGrouped);
				keys.forEach((key) => {
					billItemsGrouped[key].forEach((item) => {
						commands.push(this.core.departmentSellFromLineItem(item));
						if (item.discount) {
							if (item.discount.percent) {
								commands.push(
									this.core.discountPercentage(
										item.discount.percent,
										item.discount.description
									)
								);
							} else if (item.discount.value) {
								commands.push(
									this.core.discountValue(
										item.discount.value,
										item.discount.description
									)
								);
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
							commands.push(
								this.core.discountPercentage(
									item.discount.percent,
									item.discount.description
								)
							);
						} else if (item.discount.value) {
							commands.push(
								this.core.discountValue(
									item.discount.value,
									item.discount.description
								)
							);
						}
					}
				});
			}
			if (bill.lotteryCode) {
				commands.push(this.core.lottery(bill.lotteryCode));
			}
			bill.paymentItems.forEach(async (item) => {
				commands.push(this.core.paymentFromPaymentItem(item));
			});
			if (bill.textAfter) {
				bill.textAfter.forEach((item) => {
					commands.push(this.core.printRowAfterTotal(item));
				});
			}
			commands.push(this.core.closeReceipt());
			commands.push(this.core.terminateOperation());
			commands.push(this.core.clear());
			var sendCommandsResult = await this.sendCommands(commands);

			if (
				dumpResultFromDgfe &&
				sendCommandsResult.reduce(
					(previous, current) => previous && current.isSuccess,
					true
				)
			) {
				result.receipt = await this.getLastReceipt();
			}
		} catch (e) {
			console.error(e);
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
			var result = sendCommandsResult.reduce(
				(previous, current) => previous && current.isSuccess,
				true
			);
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
			var result = sendCommandsResult.reduce(
				(previous, current) => previous && current.isSuccess,
				true
			);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async print(
		rows: string[],
		cutPaper: boolean = false,
		header: boolean = false
	): Promise<boolean> {
		try {
			var commands: string[] = [];
			commands.push(this.core.clear());
			commands.push(this.core.reg());
			commands.push(this.core.openNonFiscalReceipt(cutPaper, header));
			rows.forEach((row) => {
				commands.push(this.core.printRow(row, false));
			});
			commands.push(this.core.closeNonFiscalReceipt());
			commands.push(this.core.closeReceipt());
			commands.push(this.core.terminateOperation());
			commands.push(this.core.clear());
			var sendCommandsResult = await this.sendCommands(commands);
			var result = sendCommandsResult.reduce(
				(previous, current) => previous && current.isSuccess,
				true
			);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getDeviceStatus(): Promise<DeviceStatus | null> {
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
	async getCurrentDateTime(): Promise<string | null> {
		try {
			var result = await this.sendCommand(this.core.getCurrentDateTime());
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
	async getCurrentSubTotal(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getCurrentSubTotal());
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
	async getFwVersion(): Promise<string | null> {
		try {
			var result = await this.sendCommand(this.core.getFirmwareRevision());
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
	async getSerialNumber(): Promise<string | null> {
		try {
			var result = await this.sendCommand(this.core.getSerialNumber());
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
	async getCorrispettivoFiscale(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getCorrispettivoFiscale());
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
	async getTotalReturns(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getTotalReturns());
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
	async getTotalCancelled(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getTotalCancelled());
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
	async getTotalCredits(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getTotalCredits());
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
	async getTotalZeroingNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getTotalZeroingNumber());
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
	async getGrandTotal(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getGrandTotal());
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
	async getHwInitNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getHwInitNumber());
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
	async getLastNotFiscalDocumentNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(
				this.core.getLastNotFiscalDocumentNumber()
			);
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
	async getCashierNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getCashierNumber());
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
	async getLastInvoiceNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getLastInvoiceNumber());
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
	async getDailyCreditNoteNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.getDailyCreditNoteNumber());
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
	async getAnnualCreditNoteNumber(): Promise<number | null> {
		try {
			var result = await this.sendCommand(
				this.core.getAnnualCreditNoteNumber()
			);
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
	async getDgfeStatus(): Promise<DgfeStatus | null> {
		try {
			var result = await this.sendCommand(this.core.dgfeStatus());
			if (result.isSuccess) {
				var dgfeStatus = parseInt(result.response[0].data);
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
	async getDgfeFreeSpace(): Promise<number | null> {
		try {
			var result = await this.sendCommand(this.core.dgfeFreeSpace());
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
	async getDayLightSavingTimeAndPeriodCheck(): Promise<DayLightSavingTimeAndPeriodCheck | null> {
		try {
			var result = await this.sendCommand(this.core.periodicAssessmentStatus());
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
	async getPrinterStatus(): Promise<PrinterStatus | null> {
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
	async getRtStatus(): Promise<RTStatus | null> {
		try {
			var result = await this.sendCommand(this.core.rtStatus());
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
	async getInactivityAndPendings(): Promise<InactivityAndPendings | null> {
		try {
			var result = await this.sendCommand(this.core.inactivityAndPendings());
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
	async getCommisioningDate(): Promise<string | null> {
		try {
			var result = await this.sendCommand(this.core.inServiceStatus());
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
	async getEthernetSettings(): Promise<EthernetSettings | null> {
		try {
			var result = await this.sendCommand(this.core.getEthernetSettings());
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

	async getCashRegisterData(): Promise<CashRegister | null> {
		try {
			var result = {} as CashRegister;
			result.deviceStatus = await this.getDeviceStatus();
			result.dateTime = await this.getCurrentDateTime();
			result.subtotal = await this.getCurrentSubTotal();
			result.fwVersion = await this.getFwVersion();
			result.serialNumber = await this.getSerialNumber();
			result.corrispettivoFiscale = await this.getCorrispettivoFiscale();
			result.totalReturns = await this.getTotalReturns();
			result.totalCancelled = await this.getTotalCancelled();
			result.totalCredits = await this.getTotalCredits();
			result.totalZeroingNumber = await this.getTotalZeroingNumber();
			result.grandTotal = await this.getGrandTotal();
			result.hwInitNumber = await this.getHwInitNumber();
			result.lastNotFiscalDocumentNumber = await this.getLastNotFiscalDocumentNumber();
			result.cashierNumber = await this.getCashierNumber();
			result.lastInvoiceNumber = await this.getLastInvoiceNumber();
			result.dailyCreditNoteNumber = await this.getDailyCreditNoteNumber();
			result.annualCreditNoteNumber = await this.getAnnualCreditNoteNumber();
			result.dgfeStatus = await this.getDgfeStatus();
			result.dgfeFreeSpace = await this.getDgfeFreeSpace();
			var dayLightSavingTimeAndPeriodCheck = await this.getDayLightSavingTimeAndPeriodCheck();
			if (dayLightSavingTimeAndPeriodCheck) {
				result.daylightSavingTime =
					dayLightSavingTimeAndPeriodCheck.daylightSavingTime;
				result.periodicCheck = dayLightSavingTimeAndPeriodCheck.periodicCheck;
			}
			result.printerStatus = await this.getPrinterStatus();
			result.rtStatus = await this.getRtStatus();
			var inactivityAndPendings = await this.getInactivityAndPendings();
			if (inactivityAndPendings) {
				result.inactive = inactivityAndPendings.inactive;
				result.pendingFiles = inactivityAndPendings.pendingFiles;
				result.maxPendingFiles = inactivityAndPendings.maxPendingFiles;
				result.firstPendingFileDateTime =
					inactivityAndPendings.firstPendingFileDateTime;
			}
			result.commissioningDate = await this.getCommisioningDate();
			result.ethernetSettings = await this.getEthernetSettings();

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
		var result: string[] = [];

		bytesRead.forEach((b) => {
			if (
				b != ComConst.CHR_ACK &&
				b != ComConst.CHR_STX &&
				b != ComConst.CHR_ETX &&
				b != ComConst.CHR_LF &&
				b != ComConst.CHR_NACK &&
				b != ComConst.CHR_CR
			) {
				this.buffer.push(b);
			}
			if (
				b == ComConst.CHR_CR ||
				b == ComConst.CHR_LF ||
				b == ComConst.CHR_ETX
			) {
				if (this.buffer.length > 0) {
					var response = Buffer.from(this.buffer).toString('ascii');
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
