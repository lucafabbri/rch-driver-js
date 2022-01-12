import { IEcrDevice } from "./IEcrDevice";
import { RchProtocol } from "./protocol/RchProtocol"
import { IProg } from "./interfaces/IProg";
import { PrinterStatus } from "./printer/PrinterStatus";
import { DeviceStatus } from "./printer/DeviceStatus";
import { BillDTO, CashRegister, Dgfe, DgfeStatus, EthernetSettings, PrintBillResponseDTO, Receipt, RTStatus } from ".";
import { DayLightSavingTimeAndPeriodCheck } from "./printer/DayLightSavingTimeAndPeriodCheck";
import { InactivityAndPendings } from "./printer/InactivityAndPendings";
import { ProgCommand } from "./models/ProgCommand";
import { RowDTO } from './dto/RowDTO';
import { DriverConfiguration } from "./DriverConfiguration";


/**
 * Driver Interface
 * @date 1/11/2022 - 2:12:30 AM
 *
 * @export
 * @interface IDriver
 * @typedef {IDriver}
 */
export interface IDriver {
	//base commands

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:18 AM
	 *
	 * @returns {Promise<boolean>}
	 */
	close(): Promise<boolean>;

	
	/**
	 * Open the connection
	 * @date 1/11/2022 - 9:30:15 PM
	 *
	 * @param {DriverConfiguration} configuration
	 * @returns {Promise<boolean>}
	 */
	open(configuration: DriverConfiguration): Promise<IDriver|null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:55 AM
	 *
	 * @param {string} command
	 * @returns {Promise<RchProtocol>}
	 */
	sendCommand(command: string): Promise<RchProtocol>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:50 AM
	 *
	 * @param {Array<string>} commands
	 * @returns {Promise<Array<RchProtocol>>}
	 */
	sendCommands(commands: Array<string>): Promise<Array<RchProtocol>>;

	//discovery

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:45 AM
	 *
	 * @returns {Promise<Array<IEcrDevice>>}
	 */
	discovery(): Promise<Array<IEcrDevice>>;

	//composed actions

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:40 AM
	 *
	 * @param {Date} from
	 * @param {Date} to
	 * @returns {Promise<Dgfe>}
	 */
	dumpDGFE(from: Date, to: Date): Promise<Dgfe>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:36 AM
	 *
	 * @returns {Promise<Receipt>}
	 */
	getLastReceipt(): Promise<Receipt>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:33 AM
	 *
	 * @returns {(Promise<IProg | null>)}
	 */
	allProgramming(): Promise<IProg | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:30 AM
	 *
	 * @returns {Promise<boolean>}
	 */
	zReport(): Promise<boolean>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:26 AM
	 *
	 * @returns {Promise<boolean>}
	 */
	xReport(): Promise<boolean>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:22 AM
	 *
	 * @param {IProg} prog
	 * @param {string} printerType
	 * @param {boolean} sendHeadings
	 * @returns {ProgCommand[]}
	 */
	buildProgCommands(
		prog: IProg,
		printerType: string,
		sendHeadings: boolean
	): ProgCommand[];

	//print

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:17 AM
	 *
	 * @param {(string[] | RowDTO[])} rows
	 * @param {boolean} cutPaper
	 * @param {boolean} header
	 * @returns {Promise<boolean>}
	 */
	print(
		rows: string[] | RowDTO[],
		cutPaper: boolean,
		header: boolean
	): Promise<boolean>;
	/**
	 *
	 * @param bill
	 * @param printDepartmentSubtotal
	 * @param dumpResultFromDgfe
	 */
	printReceipt(
		bill: BillDTO,
		printDepartmentSubtotal: boolean,
		dumpResultFromDgfe: boolean
	): Promise<PrintBillResponseDTO>;

	//statuses

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:06 AM
	 *
	 * @returns {(Promise<DeviceStatus | null>)}
	 */
	getDeviceStatus(): Promise<DeviceStatus | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:15:02 AM
	 *
	 * @returns {(Promise<string | null>)}
	 */
	getCurrentDateTime(): Promise<Date | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:58 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getCurrentSubTotal(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:55 AM
	 *
	 * @returns {(Promise<string | null>)}
	 */
	getFwVersion(): Promise<string | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:52 AM
	 *
	 * @returns {(Promise<string | null>)}
	 */
	getSerialNumber(): Promise<string | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:47 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getCorrispettivoFiscale(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:43 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getTotalReturns(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:39 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getTotalCancelled(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:36 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getTotalCredits(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:32 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getTotalZeroingNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:29 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getGrandTotal(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:24 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getHwInitNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:20 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getLastNotFiscalDocumentNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:16 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getCashierNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:12 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getLastInvoiceNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:08 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getDailyCreditNoteNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:05 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getAnnualCreditNoteNumber(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:14:00 AM
	 *
	 * @returns {(Promise<DgfeStatus | null>)}
	 */
	getDgfeStatus(): Promise<DgfeStatus | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:56 AM
	 *
	 * @returns {(Promise<number | null>)}
	 */
	getDgfeFreeSpace(): Promise<number | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:52 AM
	 *
	 * @returns {(Promise<DayLightSavingTimeAndPeriodCheck | null>)}
	 */
	getDayLightSavingTimeAndPeriodCheck(): Promise<DayLightSavingTimeAndPeriodCheck | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:48 AM
	 *
	 * @returns {(Promise<PrinterStatus | null>)}
	 */
	getPrinterStatus(): Promise<PrinterStatus | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:42 AM
	 *
	 * @returns {(Promise<RTStatus | null>)}
	 */
	getRtStatus(): Promise<RTStatus | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:37 AM
	 *
	 * @returns {(Promise<InactivityAndPendings | null>)}
	 */
	getInactivityAndPendings(): Promise<InactivityAndPendings | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:32 AM
	 *
	 * @returns {(Promise<Date | null>)}
	 */
	getCommisioningDate(): Promise<Date | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:29 AM
	 *
	 * @returns {(Promise<EthernetSettings | null>)}
	 */
	getEthernetSettings(): Promise<EthernetSettings | null>;

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:25 AM
	 *
	 * @returns {(Promise<CashRegister | null>)}
	 */
	getCashRegisterData(): Promise<CashRegister | null>;

	//listeners

	/**
	 * Description placeholder
	 * @date 1/11/2022 - 2:13:09 AM
	 *
	 * @param {Function} listner
	 * @returns {Function}
	 */
	addCommandEventListener(listner: Function): Function;
}