
/**
 * Payment information
 * @date 1/11/2022 - 11:50:41 AM
 *
 * @export
 * @interface IPayment
 * @typedef {IPayment}
 */
export interface IPayment {
  
  /**
   * Payment id
   * @date 1/11/2022 - 11:50:49 AM
   *
   * @type {number}
   */
  id: number;
  
  /**
   * Payment description
   * @date 1/11/2022 - 11:50:54 AM
   *
   * @type {string}
   */
  name: string;
  
  /**
   * The payment accepts change, usually for cash like payments
   * @date 1/11/2022 - 11:51:00 AM
   *
   * @type {boolean}
   */
  change: boolean;
  
  /**
   * Is Cash payment
   * @date 1/11/2022 - 11:51:18 AM
   *
   * @type {boolean}
   */
  cash: boolean;
  
  /**
   * Is credit payment, such us Credit Card
   * @date 1/11/2022 - 11:51:27 AM
   *
   * @type {boolean}
   */
  credit: boolean;
  
  /**
   * Whether the payment requires the drawer to open
   * @date 1/11/2022 - 11:51:44 AM
   *
   * @type {boolean}
   */
  drawer: boolean;
  
  /**
   * The payment is the kind of ticket
   * @date 1/11/2022 - 11:51:59 AM
   *
   * @type {boolean}
   */
  ticket: boolean;
  
  /**
   * The total amount i mandatory
   * @date 1/11/2022 - 11:52:11 AM
   *
   * @type {boolean}
   */
  inputTotalAmount: boolean;
  
  /**
   * Is a discount applied to payment
   * @date 1/11/2022 - 11:52:50 AM
   *
   * @type {boolean}
   */
  payDiscount: boolean;
  
  /**
   * Type of credit
   * @date 1/11/2022 - 11:53:14 AM
   *
   * @type {number}
   */
  creditType: number;
}
