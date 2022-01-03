import { CashierKey } from "./CashierKey";
import { DgfeStatus } from "./DgfeStatus";
import { EthernetSettings } from "./EthernetSettings";
import { PeriodicCheckStatus } from "./PeriodicCheckStatus";
import { ReceiptStatus } from "./ReceiptStatus";
import { PrinterStatus } from "./PrinterStatus";
import { RTStatus } from "./RTStatus";

export interface CashRegister {
    currentError: number;
    receiptStatus: ReceiptStatus;
    currentKey: CashierKey;
    lastFiscalDocumentNumber: number;
    dateTime: string;
    subtotal: number;
    fwVersion: string;
    serialNumber: string;
    corrispettivoFiscale: string;
    totalReturns: number;
    totalCancelled: number;
    totalCredits: number;
    totalZeroingNumber: number;
    grandTotal: number;
    hwInitNumber: number;
    lastNotFiscalDocumentNumber: number;
    cashierNumber: number;
    lastInvoiceNumber: number;
    lastCreditNoteNumber: number;
    lastAnnualCreditNote: number;
    dgfeStatus: DgfeStatus;
    dgfeFreeSpace: number;
    daylightSavingTime: boolean; //ora legale
    periodicCheck: PeriodicCheckStatus;
    printerStatus: PrinterStatus;
    rtStatus: RTStatus;
    inactive: boolean;
    pendingFiles: number;
    firstPendingFileDateTime: string;
    commissioningDate: string;
    ethernetSettings: EthernetSettings;
}