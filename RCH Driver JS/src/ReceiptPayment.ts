
/**
 * Receipt Payment
 * @date 1/11/2022 - 4:10:10 PM
 *
 * @export
 * @interface ReceiptPayment
 * @typedef {ReceiptPayment}
 * @see Receipt
 */
export interface ReceiptPayment{
  
  /**
   * Description
   * @date 1/11/2022 - 4:10:26 PM
   *
   * @type {string}
   */
  description: string;
  
  /**
   * Monetary total value of Payment
   * @date 1/11/2022 - 4:10:34 PM
   *
   * @type {number}
   */
  value: number;
}