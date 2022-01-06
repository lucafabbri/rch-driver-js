import { IEcrDevice } from "./IEcrDevice";
import { RchProtocol } from "./protocol/RchProtocol"
import { IProg } from "./interfaces/prog";
import { PrinterStatus } from "./printer/PrinterStatus";
import { DeviceStatus } from "./printer/DeviceStatus";
import { BillDTO, CashRegister, Dgfe, DgfeStatus, EthernetSettings, PrintBillResponseDTO, Receipt, RTStatus } from ".";
import { DayLightSavingTimeAndPeriodCheck } from "./printer/DayLightSavingTimeAndPeriodCheck";
import { InactivityAndPendings } from "./printer/InactivityAndPendings";

export interface IDriver {
	//base commands
	close(): Promise<boolean>;
	open(): Promise<boolean>;
	sendCommand(command: string): Promise<RchProtocol>;
	sendCommands(commands: Array<string>): Promise<Array<RchProtocol>>;

	//discovery
	discovery(): Promise<Array<IEcrDevice>>;

	//composed actions
	dumpDGFE(from: Date, to: Date): Promise<Dgfe>;
	getLastReceipt(): Promise<Receipt>;
	allProgramming(): Promise<IProg | null>;
	zReport(): Promise<boolean>;
	xReport(): Promise<boolean>;

	//print
	print(rows: string[], cutPaper: boolean, header: boolean): Promise<boolean>;
	printReceipt(
		bill: BillDTO,
		printDepartmentSubtotal: boolean
	): Promise<PrintBillResponseDTO>;

	//statuses
	getDeviceStatus(): Promise<DeviceStatus | null>;
	getCurrentDateTime(): Promise<string | null>;
	getCurrentSubTotal(): Promise<number | null>;
	getFwVersion(): Promise<string | null>;
	getSerialNumber(): Promise<string | null>;
	getCorrispettivoFiscale(): Promise<number | null>;
	getTotalReturns(): Promise<number | null>;
	getTotalCancelled(): Promise<number | null>;
	getTotalCredits(): Promise<number | null>;
	getTotalZeroingNumber(): Promise<number | null>;
	getGrandTotal(): Promise<number | null>;
	getHwInitNumber(): Promise<number | null>;
	getLastNotFiscalDocumentNumber(): Promise<number | null>;
	getCashierNumber(): Promise<number | null>;
	getLastInvoiceNumber(): Promise<number | null>;
	getDailyCreditNoteNumber(): Promise<number | null>;
	getAnnualCreditNoteNumber(): Promise<number | null>;
	getDgfeStatus(): Promise<DgfeStatus | null>;
	getDgfeFreeSpace(): Promise<number | null>;
	getDayLightSavingTimeAndPeriodCheck(): Promise<DayLightSavingTimeAndPeriodCheck | null>;
	getPrinterStatus(): Promise<PrinterStatus | null>;
	getRtStatus(): Promise<RTStatus | null>;
	getInactivityAndPendings(): Promise<InactivityAndPendings | null>;
	getCommisioningDate(): Promise<string | null>;
	getEthernetSettings(): Promise<EthernetSettings | null>;
	getCashRegisterData(): Promise<CashRegister | null>;

	//listeners
	addCommandEventListener(listner: Function): Function;
}