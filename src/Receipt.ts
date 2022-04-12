import { Document } from "./Document";
import { ReceiptItem } from "./ReceiptItem";
import { ReceiptPayment } from "./ReceiptPayment";

/**
 * Fiscal document
 * @date 1/11/2022 - 4:06:24 PM
 *
 * @export
 * @class Receipt
 * @typedef {Receipt}
 * @extends {Document}
 */
export class Receipt extends Document {
  
	/**
   * Document grand total
   * @date 1/11/2022 - 4:06:38 PM
   *
   * @type {(number | undefined)}
   */
  grandTotal: number | undefined;
  
	/**
   * Document taxes total
   * @date 1/11/2022 - 4:06:47 PM
   *
   * @type {(number | undefined)}
   */
  vatTotal: number | undefined;
  
  /**
   * Document payments total
   * @date 1/11/2022 - 4:06:54 PM
   *
   * @type {(number | undefined)}
   */
  paymentTotal: number | undefined;
  
  /**
   * Document items
   * @date 1/11/2022 - 4:07:05 PM
   *
   * @type {ReceiptItem[]}
   */
  items: ReceiptItem[] = [];
  
  /**
   * Documents payments
   * @date 1/11/2022 - 4:07:11 PM
   *
   * @type {ReceiptPayment[]}
   */
  payments: ReceiptPayment[] = []
}