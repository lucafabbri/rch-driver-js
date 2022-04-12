import { ReceiptItemDiscount } from "./ReceiptItemDiscount";

/**
 * Fiscal document item
 * @date 1/11/2022 - 4:07:29 PM
 *
 * @export
 * @interface ReceiptItem
 * @typedef {ReceiptItem}
 * @see Receipt
 */
export interface ReceiptItem{
	
	/**
	 * Nature if applicable
	 * @date 1/11/2022 - 4:08:01 PM
	 *
	 * @type {string}
	 */
	nature: string;
	
	/**
	 * Quantity
	 * @date 1/11/2022 - 4:08:10 PM
	 *
	 * @type {number}
	 */
	qty: number;
	/**
	 * Unit price
	 */
	unitValue: number;
	
	/**
	 * Discount
	 * @date 1/11/2022 - 4:08:28 PM
	 *
	 * @type {ReceiptItemDiscount}
	 */
	discount: ReceiptItemDiscount;
	
  /**
	 * Description
	 * @date 1/11/2022 - 4:08:35 PM
	 *
	 * @type {string}
	 */
	description: string;
	
  /**
	 * Vat percentage if applicable
	 * @date 1/11/2022 - 4:08:42 PM
	 *
	 * @type {number}
	 */
	vat: number;
	
  /**
	 * Total monetary value of item
	 * @date 1/11/2022 - 4:08:50 PM
	 *
	 * @type {number}
	 */
	value: number;
}