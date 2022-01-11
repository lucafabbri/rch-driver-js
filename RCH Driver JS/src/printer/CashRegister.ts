import { CashierKey } from "./CashierKey";
import { DgfeStatus } from "./DgfeStatus";
import { EthernetSettings } from "./EthernetSettings";
import { PeriodicCheckStatus } from "./PeriodicCheckStatus";
import { ReceiptStatus } from "./ReceiptStatus";
import { PrinterStatus } from "./PrinterStatus";
import { RTStatus } from "./RTStatus";
import { DeviceStatus } from ".";


/**
 * All cashier information in one place
 * @date 1/11/2022 - 12:21:28 PM
 *
 * @export
 * @class CashRegister
 * @typedef {CashRegister}
 */
export class CashRegister {
    
    /**
     * Max number of pending files. Default 25.
     * @date 1/11/2022 - 12:27:36 PM
     *
     * @type {number}
     */
    maxPendingFiles: number = 25;
    
	/**
     * Status of the Device
     * @date 1/11/2022 - 12:27:29 PM
     *
     * @type {?DeviceStatus}
     */
    deviceStatus?: DeviceStatus;

	/**
	 * Date of the printer
	 * @date 1/11/2022 - 12:27:10 PM
	 *
	 * @type {?Date}
	 */
	dateTime?: Date;

	/**
	 * Current subtotal if any
	 * @date 1/11/2022 - 12:27:01 PM
	 *
	 * @type {?number}
	 */
	subtotal?: number;

	/**
	 * Fw Version
	 * @date 1/11/2022 - 12:26:56 PM
	 *
	 * @type {?string}
	 */
	fwVersion?: string;

	/**
	 * Serial number
	 * @date 1/11/2022 - 12:26:48 PM
	 *
	 * @type {?string}
	 */
	serialNumber?: string;

	/**
	 * Corrispettivo fiscale
	 * @date 1/11/2022 - 12:26:40 PM
	 *
	 * @type {?number}
	 */
	corrispettivoFiscale?: number;

	/**
	 * Number of documents returned
	 * @date 1/11/2022 - 12:26:28 PM
	 *
	 * @type {?number}
	 */
	totalReturns?: number;

	/**
	 * Number of documents canceled
	 * @date 1/11/2022 - 12:26:18 PM
	 *
	 * @type {?number}
	 */
	totalCancelled?: number;

	/**
	 * Number to total credits
	 * @date 1/11/2022 - 12:26:10 PM
	 *
	 * @type {?number}
	 */
	totalCredits?: number;

	/**
	 * Number of zeroing of the cashier
	 * @date 1/11/2022 - 12:25:57 PM
	 *
	 * @type {?number}
	 */
	totalZeroingNumber?: number;

	/**
	 * Grand total
	 * @date 1/11/2022 - 12:25:51 PM
	 *
	 * @type {?number}
	 */
	grandTotal?: number;

	/**
	 * Times the cashier was initialized with a HW Init
	 * @date 1/11/2022 - 12:25:38 PM
	 *
	 * @type {?number}
	 */
	hwInitNumber?: number;

	/**
	 * last non fiscal document number
	 * @date 1/11/2022 - 12:25:30 PM
	 *
	 * @type {?number}
	 */
	lastNotFiscalDocumentNumber?: number;

	/**
	 * The number of the cashier
	 * @date 1/11/2022 - 12:25:22 PM
	 *
	 * @type {?number}
	 */
	cashierNumber?: number;

	/**
	 * Last invoice number
	 * @date 1/11/2022 - 12:25:16 PM
	 *
	 * @type {?number}
	 */
	lastInvoiceNumber?: number;

	/**
	 * Number of the credit note on current day
	 * @date 1/11/2022 - 12:25:08 PM
	 *
	 * @type {?number}
	 */
	dailyCreditNoteNumber?: number;

	/**
	 * NUmber of the credit nots on current year
	 * @date 1/11/2022 - 12:24:52 PM
	 *
	 * @type {?number}
	 */
	annualCreditNoteNumber?: number;

	/**
	 * Status of the DGFE
	 * @date 1/11/2022 - 12:24:45 PM
	 *
	 * @type {?DgfeStatus}
	 */
	dgfeStatus?: DgfeStatus;

	/**
	 * Percentage of DGFE free space
	 * @date 1/11/2022 - 12:24:31 PM
	 *
	 * @type {?number}
	 */
	dgfeFreeSpace?: number;

	/**
	 * Daylight saving time or solar time
	 * @date 1/11/2022 - 12:24:03 PM
	 *
	 * @type {?boolean}
	 */
	daylightSavingTime?: boolean; //ora legale

	/**
	 * Status of the Periodic Check
	 * @date 1/11/2022 - 12:23:45 PM
	 *
	 * @type {?PeriodicCheckStatus}
	 */
	periodicCheck?: PeriodicCheckStatus;

	/**
	 * Status of the printer
	 * @date 1/11/2022 - 12:23:38 PM
	 *
	 * @type {?PrinterStatus}
	 */
	printerStatus?: PrinterStatus;

	/**
	 * Status of the RT
	 * @date 1/11/2022 - 12:23:32 PM
	 *
	 * @type {?RTStatus}
	 */
	rtStatus?: RTStatus;

	/**
	 * If the cashier is inactive
	 * @date 1/11/2022 - 12:23:19 PM
	 *
	 * @type {?boolean}
	 */
	inactive?: boolean;

	/**
	 * Number of pending files
	 * @date 1/11/2022 - 12:23:12 PM
	 *
	 * @type {?number}
	 */
	pendingFiles?: number;

	/**
	 * First pending file datetime
	 * @date 1/11/2022 - 12:23:04 PM
	 *
	 * @type {?string}
	 */
	firstPendingFileDateTime?: string;

	/**
	 * Date when the cashier was initialized
	 * @date 1/11/2022 - 12:22:51 PM
	 *
	 * @type {?string}
	 */
	commissioningDate?: string;

	/**
	 * Ethernet settings
	 * @date 1/11/2022 - 12:22:43 PM
	 *
	 * @type {?EthernetSettings}
	 */
	ethernetSettings?: EthernetSettings;
}