
/**
 * Redceipt Item Discount
 * @date 1/11/2022 - 4:09:07 PM
 *
 * @export
 * @interface ReceiptItemDiscount
 * @typedef {ReceiptItemDiscount}
 * @see Receipt
 */
export interface ReceiptItemDiscount{
  
	/**
   * Vat percentage if applicable
   * @date 1/11/2022 - 4:09:24 PM
   *
   * @type {number}
   */
  vat: number;
  
	/**
   * Vat nature if applicable
   * @date 1/11/2022 - 4:09:35 PM
   *
   * @type {string}
   */
  nature: string;
  
  /**
   * Description
   * @date 1/11/2022 - 4:09:42 PM
   *
   * @type {string}
   */
  description: string;
  
  /**
   * Value of Discount
   * @date 1/11/2022 - 4:10:01 PM
   *
   * @type {number}
   */
  value: number;
  
  /**
   * Percentage of Discount
   * @date 1/11/2022 - 4:09:50 PM
   *
   * @type {number}
   */
  percentage: number;
}