import { BillType } from "./BillType";
import { LineItemDTO } from "./LineItemDTO";
import { PaymentItemDTO } from "./PaymentItemDTO";
import { ReturnInfoDTO } from "./ReturnInfoDTO";



/**
 * Interface of a Bill including Receipts, Returns and Cancel Documents
 * @date 1/11/2022 - 10:10:12 AM
 *
 * @export
 * @class BillDTO
 * @typedef {BillDTO}
 */
export class BillDTO {
	/**
	 * Bill Type to identify the Bill
	 * @date 1/11/2022 - 10:11:59 AM
	 *
	 * @type {BillType}
	 */
	billType: BillType = BillType.RECEIPT;

	/**
	 * This is true if the BillType is a RETURN
	 * @date 1/11/2022 - 10:12:52 AM
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get isReturn(): boolean {
		return this.billType == BillType.RETURN;
	}

	/**
	 * This is true if the BillType is a CANCEL
	 * @date 1/11/2022 - 10:14:08 AM
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get isCancel(): boolean {
		return this.billType == BillType.CANCEL;
	}

	/**
	 * This is true if the BillType is a RECEIPT
	 * @date 1/11/2022 - 10:14:45 AM
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get isReceipt(): boolean {
		return this.billType == BillType.RECEIPT;
	}
	
	/**
	 * Those are the Info for RETURN and CANCEL
	 * @date 1/11/2022 - 10:14:58 AM
	 *
	 * @type {?ReturnInfoDTO}
	 */
	returnInfo?: ReturnInfoDTO;
	
	/**
	 * The items to be sold or return
	 * @date 1/11/2022 - 10:15:33 AM
	 *
	 * @type {LineItemDTO[]}
	 */
	lineItems: LineItemDTO[] = [];
	
	/**
	 * All payments, mandatory for RECEIPT they fall back to T1 if empty
	 * @date 1/11/2022 - 10:15:51 AM
	 *
	 * @type {?PaymentItemDTO[]}
	 */
	paymentItems?: PaymentItemDTO[];
	
	/**
	 * Optional Operator number
	 * @date 1/11/2022 - 10:16:21 AM
	 *
	 * @type {?number}
	 */
	operator?: number;
	
	/**
	 * Optional Lotteria degli Scontrini code
	 * @date 1/11/2022 - 10:16:37 AM
	 *
	 * @type {?string}
	 */
	lotteryCode?: string;
	
	/**
	 * Lines of text before the items
	 * @date 1/11/2022 - 10:16:51 AM
	 *
	 * @type {?string[]}
	 */
	textBefore?: string[];
	
	/**
	 * Lines of text after the Payments details
	 * @date 1/11/2022 - 10:17:03 AM
	 *
	 * @type {?string[]}
	 */
	textAfter?: string[];
}