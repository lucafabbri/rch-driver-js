
/**
 * Vat description
 * @date 1/11/2022 - 12:05:42 PM
 *
 * @export
 * @interface IVat
 * @typedef {IVat}
 */
export interface IVat {
  
  /**
   * Vat id
   * @date 1/11/2022 - 12:05:48 PM
   *
   * @type {number}
   */
  id: number;
  
  /**
   * Vat type
   * @date 1/11/2022 - 12:05:56 PM
   *
   * @type {string}
   */
  type: string;
  
  /**
   * Ateco code
   * @date 1/11/2022 - 12:06:06 PM
   *
   * @type {string}
   */
  ateco: string;
  
  /**
   * Value that depends on type
   * @date 1/11/2022 - 12:06:17 PM
   *
   * @type {number}
   */
  value: number;
}
