import { ClosureDiscount, ClosurePayment, ClosureVat } from '.';
import {Document} from './Document';

/**
 * Document representin a fiscal closure document
 * @date 1/11/2022 - 3:18:16 PM
 *
 * @export
 * @class Closure
 * @typedef {Closure}
 * @extends {Document}
 */
export class Closure extends Document {
	
	/**
	 * Number of sells
	 * @date 1/11/2022 - 3:23:33 PM
	 *
	 * @type {(number | undefined)}
	 */
	sells: number | undefined;
	
	/**
	 * Grand Total
	 * @date 1/11/2022 - 3:23:53 PM
	 *
	 * @type {(number | undefined)}
	 */
	grandTotal: number | undefined;
	
	/**
	 * Number of invoices
	 * @date 1/11/2022 - 3:40:27 PM
	 *
	 * @type {(number | undefined)}
	 */
	invoices: number | undefined;
	
	/**
	 * The total of invoices
	 * @date 1/11/2022 - 3:40:40 PM
	 *
	 * @type {(number | undefined)}
	 */
	invoicesTotal: number | undefined;
	
	/**
	 * Number of fiscal docuoments
	 * @date 1/11/2022 - 3:40:57 PM
	 *
	 * @type {(number | undefined)}
	 */
	fiscalDocuments: number | undefined;
	
	/**
	 * Number of management documents
	 * @date 1/11/2022 - 3:41:06 PM
	 *
	 * @type {(number | undefined)}
	 */
	managementDocuments: number | undefined;
	
	/**
	 * NUmber of the reads of summaries
	 * @date 1/11/2022 - 3:41:18 PM
	 *
	 * @type {(number | undefined)}
	 */
	summaryReadings: number | undefined;
	
	/**
	 * NUmber of restores
	 * @date 1/11/2022 - 3:42:19 PM
	 *
	 * @type {(number | undefined)}
	 */
	restores: number | undefined;
	
	/**
	 * Number of the DGFE
	 * @date 1/11/2022 - 3:42:28 PM
	 *
	 * @type {(number | undefined)}
	 */
	dgfeNumber: number | undefined;
	
	/**
	 * Fiscal Seal
	 * @date 1/11/2022 - 3:42:44 PM
	 *
	 * @type {(string | undefined)}
	 */
	fiscalSeal: string | undefined;
	
	/**
	 * Total of canceled documents
	 * @date 1/11/2022 - 3:42:54 PM
	 *
	 * @type {(number | undefined)}
	 */
	cancelledDocumentsTotal: number | undefined;
	
	/**
	 * Vats details
	 * @date 1/11/2022 - 3:43:09 PM
	 *
	 * @type {ClosureVat[]}
	 */
	vats: ClosureVat[] = [];
	
	/**
	 * Payments details
	 * @date 1/11/2022 - 3:43:24 PM
	 *
	 * @type {ClosurePayment[]}
	 */
	payments: ClosurePayment[] = [];
	
	/**
	 * Discounts details
	 * @date 1/11/2022 - 3:43:35 PM
	 *
	 * @type {ClosureDiscount[]}
	 */
	discounts: ClosureDiscount[] = [];
}
