
/**
 * Generic Document definition
 * @date 1/11/2022 - 11:45:29 AM
 *
 * @export
 * @interface IDocument
 * @typedef {IDocument}
 */
export interface IDocument {
  
  /**
   * The rows of the document
   * @date 1/11/2022 - 11:45:49 AM
   *
   * @type {Array<String>}
   */
  rows: Array<String>;
  
  /**
   * The number of the document
   * @date 1/11/2022 - 11:46:03 AM
   *
   * @type {Number}
   */
  number: Number;
  
  /**
   * The closure number of the document
   * @date 1/11/2022 - 11:46:10 AM
   *
   * @type {Number}
   */
  closure: Number;
  
  /**
   * whether the document is not fiscal
   * @date 1/11/2022 - 11:46:18 AM
   *
   * @type {Boolean}
   */
  isNotFiscal: Boolean;
  
  /**
   * The date of the document
   * @date 1/11/2022 - 11:46:35 AM
   *
   * @type {Date}
   */
  date: Date;
}
