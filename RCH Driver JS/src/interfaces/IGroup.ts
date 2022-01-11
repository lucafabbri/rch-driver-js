
/**
 * Information about a Group od Departments
 * @date 1/11/2022 - 11:46:56 AM
 *
 * @export
 * @interface IGroup
 * @typedef {IGroup}
 * @see IDepartment
 */
export interface IGroup {
  
  /**
   * Group id
   * @date 1/11/2022 - 11:47:23 AM
   *
   * @type {number}
   */
  id: number;
  
  /**
   * Group description
   * @date 1/11/2022 - 11:47:32 AM
   *
   * @type {string}
   */
  name: string;
}
