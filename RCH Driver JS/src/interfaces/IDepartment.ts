
/**
 * Department object as stored in Printer
 * @date 1/11/2022 - 10:56:20 AM
 *
 * @export
 * @interface IDepartment
 * @typedef {IDepartment}
 */
export interface IDepartment {
  
  /**
   * The deparment id
   * @date 1/11/2022 - 11:01:31 AM
   *
   * @type {number}
   */
  id: number;
  
  /**
   * Defauklt description of the Department.
   * This will be printed if no description is provided
   * @date 1/11/2022 - 11:00:58 AM
   *
   * @type {string}
   */
  name: string;
  
  /**
   * Department type:
   * 0 for goods
   * 1 for services
   * @date 1/11/2022 - 11:00:28 AM
   *
   * @type {number}
   */
  departmentType: number;
  
  /**
   * Default price
   * @date 1/11/2022 - 11:00:13 AM
   *
   * @type {number}
   */
  price: number;
  
  /**
   * Highest value
   * @date 1/11/2022 - 11:00:07 AM
   *
   * @type {number}
   */
  halo: number;
  
  /**
   * Lowest value
   * @date 1/11/2022 - 10:58:51 AM
   *
   * @type {number}
   */
  lalo: number;
  
  /**
   * TBD
   * @date 1/11/2022 - 10:58:26 AM
   *
   * @type {boolean}
   */
  single: boolean;
  
  /**
   * This is the Id of a Vat
   * @date 1/11/2022 - 10:58:00 AM
   *
   * @type {number}
   * @see IVat
   */
  vatCode: number;
  
  /**
   * The group used to collection department together. 
   * Almost not much used actually
   * @date 1/11/2022 - 10:57:03 AM
   *
   * @type {number}
   */
  groupCode: number;
}
