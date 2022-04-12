import { ILogo } from './ILogo';
import { ICourtesyLine } from './ICourtesyLine';
import { ISlidingMsg } from './ISlidingMsg';
import { IPeriodCheck } from './IPeriodCheck';
import { IXMLSendSchedule } from './IXMLSendSchedule';
import { IInvoiceText } from './IInvoiceText';
import { IDepartment } from './IDepartment';
import { IVat } from './IVat';
import { IOperator } from './IOperator';
import { IPayment } from './IPayment';
import { IGroup } from './IGroup';
import { IHeadingRow } from './IHeadingRow';


/**
 * It represents the programming of a device
 * @date 1/11/2022 - 11:54:38 AM
 *
 * @export
 * @interface IProg
 * @typedef {IProg}
 */
export interface IProg {
	/**
	 * Statics by Department
	 * @date 1/11/2022 - 11:54:57 AM
	 *
	 * @type {(boolean | null)}
	 */
	statDepartment: boolean | null;

	/**
	 * Statistics by Vat
	 * @date 1/11/2022 - 11:55:06 AM
	 *
	 * @type {(boolean | null)}
	 */
	statVat: boolean | null;

	/**
	 * Statistics by Hour
	 * @date 1/11/2022 - 11:55:20 AM
	 *
	 * @type {(boolean | null)}
	 */
	statHour: boolean | null;

	/**
	 * Statistics by Opeartor
	 * @date 1/11/2022 - 11:55:30 AM
	 *
	 * @type {(boolean | null)}
	 */
	statClerk: boolean | null;

	/**
	 * Statistic by Financial
	 * @date 1/11/2022 - 11:55:41 AM
	 *
	 * @type {(boolean | null)}
	 */
	statFinancial: boolean | null;

	/**
	 * Statistics by Department Groups
	 * @date 1/11/2022 - 11:55:53 AM
	 *
	 * @type {(boolean | null)}
	 */
	statGrpDetail: boolean | null;

	/**
	 * Statistics by Total for Department Groups
	 * @date 1/11/2022 - 11:56:16 AM
	 *
	 * @type {(boolean | null)}
	 */
	statGrpTot: boolean | null;

	/**
	 * Logo max 2 entries
	 * @date 1/11/2022 - 11:56:35 AM
	 *
	 * @type {ILogo[]}
	 */
	logo: ILogo[];

	/**
	 * Courtesy lines max 6 entries
	 * @date 1/11/2022 - 11:56:47 AM
	 *
	 * @type {ICourtesyLine[]}
	 */
	courtesyLine: ICourtesyLine[];

	/**
	 * 1 to 3 sliding texts on printer screen
	 * @date 1/11/2022 - 11:56:57 AM
	 *
	 * @type {(ISlidingMsg | null)}
	 */
	slidingMsg: ISlidingMsg | null;

	/**
	 * Discount percentage
	 * @date 1/11/2022 - 11:57:15 AM
	 *
	 * @type {number}
	 */
	percDiscount: number;

	/**
	 * Percentage addon
	 * @date 1/11/2022 - 11:57:24 AM
	 *
	 * @type {number}
	 */
	percAddon: number;

	/**
	 * Drawer pulse intensity
	 * @date 1/11/2022 - 11:57:41 AM
	 *
	 * @type {number}
	 */
	drawerPulse: number;

	/**
	 * ECR number
	 * @date 1/11/2022 - 11:57:49 AM
	 *
	 * @type {number}
	 */
	eCRNum: number;

	/**
	 * Current invoice number
	 * @date 1/11/2022 - 11:57:56 AM
	 *
	 * @type {boolean}
	 */
	intInvoice: boolean;

	/**
	 * Allow invoices on 2 lines
	 * @date 1/11/2022 - 11:58:17 AM
	 *
	 * @type {boolean}
	 */
	invoice2Lines: boolean;

	/**
	 * Allow invoice subtotal
	 * @date 1/11/2022 - 11:58:33 AM
	 *
	 * @type {boolean}
	 */
	invoiceSubtotal: boolean;

	/**
	 * Allow Client check in invoices
	 * @date 1/11/2022 - 11:58:44 AM
	 *
	 * @type {boolean}
	 */
	invoiceClientCheck: boolean;

	/**
	 * Activate fidelity option
	 * @date 1/11/2022 - 11:59:00 AM
	 *
	 * @type {(boolean | null)}
	 */
	fidelity: boolean | null;

	/**
	 * Print pieces per Operator
	 * @date 1/11/2022 - 11:59:14 AM
	 *
	 * @type {(boolean | null)}
	 */
	pcsOperatorPrint: boolean | null;

	/**
	 * TBD
	 * @date 1/11/2022 - 11:59:30 AM
	 *
	 * @type {(boolean | null)}
	 */
	kbdPrebill: boolean | null;

	/**
	 * Period Check information
	 * @date 1/11/2022 - 11:59:44 AM
	 *
	 * @type {(IPeriodCheck | null)}
	 */
	periodCheck: IPeriodCheck | null;

	/**
	 * Print ECR number in Documents
	 * @date 1/11/2022 - 11:59:54 AM
	 *
	 * @type {boolean}
	 */
	printECRNum: boolean;

	/**
	 * Print either the single quantity by default
	 * @date 1/11/2022 - 12:00:04 PM
	 *
	 * @type {boolean}
	 */
	singleQuantity: boolean;

	/**
	 * Print the Unit Price by default
	 * @date 1/11/2022 - 12:00:20 PM
	 *
	 * @type {(boolean | null)}
	 */
	printUnitPrice: boolean | null;

	/**
	 * Show change
	 * @date 1/11/2022 - 12:04:27 PM
	 *
	 * @type {boolean}
	 */
	showChange: boolean;

	/**
	 * Subtotal mandatory
	 * @date 1/11/2022 - 12:04:53 PM
	 *
	 * @type {(boolean | null)}
	 */
	mandSubtotal: boolean | null;

	/**
	 * Enable cutter
	 * @date 1/11/2022 - 12:04:59 PM
	 *
	 * @type {(boolean | null)}
	 */
	cutter: boolean | null;

	/**
	 * Midnight alert to remember to send Z report
	 * @date 1/11/2022 - 12:03:56 PM
	 *
	 * @type {boolean}
	 */
	midnightAlert: boolean;

	/**
	 * Credit note allowed
	 * @date 1/11/2022 - 12:03:48 PM
	 *
	 * @type {(boolean | null)}
	 */
	creditNote: boolean | null;

	/**
	 * Progressive credit not
	 * @date 1/11/2022 - 12:03:39 PM
	 *
	 * @type {number}
	 */
	creditNoteProgressive: number;

	/**
	 * Declare is cash
	 * @date 1/11/2022 - 12:03:31 PM
	 *
	 * @type {(boolean | null)}
	 */
	cashDeclaration: boolean | null;

	/**
	 * User the print buffer to accumulate department sells
	 * @date 1/11/2022 - 12:03:16 PM
	 *
	 * @type {(boolean | null)}
	 */
	printBuffer: boolean | null;

	/**
	 * print the net value in the department
	 * @date 1/11/2022 - 12:03:00 PM
	 *
	 * @type {(boolean | null)}
	 */
	departmentNet: boolean | null;

	/**
	 * Cut the end of the document
	 * @date 1/11/2022 - 12:02:48 PM
	 *
	 * @type {(boolean | null)}
	 */
	appendixCut: boolean | null;

	/**
	 * Global Vat Ventilation
	 * @date 1/11/2022 - 12:02:35 PM
	 *
	 * @type {(boolean | null)}
	 */
	vatVentilation: boolean | null;

	/**
	 * Allow to print last receipt form DGFE
	 * @date 1/11/2022 - 12:02:20 PM
	 *
	 * @type {(boolean | null)}
	 */
	printLastReceiptFromDGFE: boolean | null;

	/**
	 * Progressive of the Invoice number
	 * @date 1/11/2022 - 12:02:11 PM
	 *
	 * @type {number}
	 */
	invoiceProgressive: number;

	/**
	 * Maximum receipt value
	 * @date 1/11/2022 - 12:02:02 PM
	 *
	 * @type {number}
	 */
	receiptLimit: number;

	/**
	 * Schedule for sending the XML
	 * @date 1/11/2022 - 12:01:52 PM
	 *
	 * @type {(IXMLSendSchedule | null)}
	 */
	xMLSendSchedule: IXMLSendSchedule | null;

	/**
	 * Text in the invoice
	 * @date 1/11/2022 - 12:01:45 PM
	 *
	 * @type {IInvoiceText[]}
	 */
	invoiceText: IInvoiceText[];

	/**
	 * Departments
	 * @date 1/11/2022 - 12:01:33 PM
	 *
	 * @type {IDepartment[]}
	 */
	departments: IDepartment[];

	/**
	 * Vats
	 * @date 1/11/2022 - 12:01:28 PM
	 *
	 * @type {IVat[]}
	 */
	vats: IVat[];

	/**
	 * Operators
	 * @date 1/11/2022 - 12:01:21 PM
	 *
	 * @type {IOperator[]}
	 */
	operators: IOperator[];

	/**
	 * Payments
	 * @date 1/11/2022 - 12:01:17 PM
	 *
	 * @type {IPayment[]}
	 */
	payments: IPayment[];

	/**
	 * Groups
	 * @date 1/11/2022 - 12:01:12 PM
	 *
	 * @type {IGroup[]}
	 */
	groups: IGroup[];

	/**
	 * Courtesy Lines max 2
	 * @date 1/11/2022 - 12:00:59 PM
	 *
	 * @type {ICourtesyLine[]}
	 */
	courtesyLines: ICourtesyLine[];

	/**
	 * Headings for the business details 6 rows
	 * @date 1/11/2022 - 12:00:36 PM
	 *
	 * @type {IHeadingRow[]}
	 */
	headings: IHeadingRow[];
}
