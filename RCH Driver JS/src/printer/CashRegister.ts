import { CashierKey } from "./CashierKey";
import { DgfeStatus } from "./DgfeStatus";
import { EthernetSettings } from "./EthernetSettings";
import { PeriodicCheckStatus } from "./PeriodicCheckStatus";
import { ReceiptStatus } from "./ReceiptStatus";
import { PrinterStatus } from "./PrinterStatus";
import { RTStatus } from "./RTStatus";
import { DeviceStatus } from ".";

export interface CashRegister {
    maxPendingFiles: number;
    deviceStatus: DeviceStatus | null;
    dateTime: string | null;
    subtotal: number | null;
    fwVersion: string | null;
    serialNumber: string | null;
    corrispettivoFiscale: number | null;
    totalReturns: number | null;
    totalCancelled: number | null;
    totalCredits: number | null;
    totalZeroingNumber: number | null;
    grandTotal: number | null;
    hwInitNumber: number | null;
    lastNotFiscalDocumentNumber: number | null;
    cashierNumber: number | null;
    lastInvoiceNumber: number | null;
    dailyCreditNoteNumber: number | null;
    annualCreditNoteNumber: number | null;
    dgfeStatus: DgfeStatus | null;
    dgfeFreeSpace: number | null;
    daylightSavingTime: boolean | null; //ora legale
    periodicCheck: PeriodicCheckStatus | null;
    printerStatus: PrinterStatus | null;
    rtStatus: RTStatus | null;
    inactive: boolean | null;
    pendingFiles: number | null;
    firstPendingFileDateTime: string | null;
    commissioningDate: string | null;
    ethernetSettings: EthernetSettings | null;
}