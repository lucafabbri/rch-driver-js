
/**
 * XML send schedule
 * @date 1/11/2022 - 12:06:49 PM
 *
 * @export
 * @interface IXMLSendSchedule
 * @typedef {IXMLSendSchedule}
 */
export interface IXMLSendSchedule {
  
  /**
   * Enabled
   * @date 1/11/2022 - 12:07:32 PM
   *
   * @type {boolean}
   */
  enabled: boolean;
  
  /**
   * Hours
   * @date 1/11/2022 - 12:07:27 PM
   *
   * @type {number}
   */
  hours: number;
  
  /**
   * Minutes
   * @date 1/11/2022 - 12:07:22 PM
   *
   * @type {number}
   */
  minutes: number;
  
  /**
   * Start hour
   * @date 1/11/2022 - 12:07:14 PM
   *
   * @type {number}
   */
  startHour: number;
  
  /**
   * End hour
   * @date 1/11/2022 - 12:07:09 PM
   *
   * @type {number}
   */
  endHour: number;
  
  /**
   * Stand by
   * @date 1/11/2022 - 12:07:02 PM
   *
   * @type {number}
   */
  standBy: number;
}
