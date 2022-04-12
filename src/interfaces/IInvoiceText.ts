
/**
 * Represents the rows of heading for invoices
 * @date 1/11/2022 - 11:48:15 AM
 *
 * @export
 * @interface IInvoiceText
 * @typedef {IInvoiceText}
 */
export interface IInvoiceText {
  
  /**
   * Row id
   * @date 1/11/2022 - 11:48:30 AM
   *
   * @type {number}
   */
  id: number;
  
  /**
   * Row description
   * @date 1/11/2022 - 11:48:38 AM
   *
   * @type {string}
   */
  name: string;
  
  /**
   * Whether the row is enabled or not
   * @date 1/11/2022 - 11:48:45 AM
   *
   * @type {boolean}
   */
  enabled: boolean;
}
