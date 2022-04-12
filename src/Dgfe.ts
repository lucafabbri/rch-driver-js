import { Closure } from "./Closure";
import { Receipt } from "./Receipt";

/**
 * DGFE representation as object
 * @date 1/11/2022 - 3:57:20 PM
 *
 * @export
 * @interface Dgfe
 * @typedef {Dgfe}
 */
export interface Dgfe{
  
  /**
   * From date of the export
   * @date 1/11/2022 - 3:57:35 PM
   *
   * @type {Date}
   */
  from: Date,
  
  /**
   * To date of the export
   * @date 1/11/2022 - 3:57:45 PM
   *
   * @type {Date}
   */
  to: Date,
  
  /**
   * Fiscal documents
   * @date 1/11/2022 - 3:57:53 PM
   *
   * @type {Receipt[]}
   */
  receipts: Receipt[];
  
  /**
   * Fiscal closure documents
   * @date 1/11/2022 - 3:58:10 PM
   *
   * @type {Closure[]}
   */
  closures: Closure[];
}