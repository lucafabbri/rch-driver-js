import { PeriodicCheckStatus } from ".";

/**
 * Day Light Saving Time And Period Check 
 * @date 1/11/2022 - 12:28:01 PM
 *
 * @export
 * @class DayLightSavingTimeAndPeriodCheck
 * @typedef {DayLightSavingTimeAndPeriodCheck}
 */
export class DayLightSavingTimeAndPeriodCheck {

	/**
	 * Daylight saving time or solar time
	 * @date 1/11/2022 - 12:24:03 PM
	 *
	 * @type {?boolean}
	 */
	daylightSavingTime: boolean; //ora legale

	/**
	 * Status of the Periodic Check
	 * @date 1/11/2022 - 12:23:45 PM
	 *
	 * @type {?PeriodicCheckStatus}
	 */
	periodicCheck: PeriodicCheckStatus;
	
	/**
	 * Creates an instance of DayLightSavingTimeAndPeriodCheck.
	 * @date 1/11/2022 - 12:30:45 PM
	 *
	 * @constructor
	 * @param {string} data
	 */
	constructor(data: string) {
		this.daylightSavingTime = data.charAt(1) == '1';
		if (data.charAt(2) == '1') {
			this.periodicCheck = PeriodicCheckStatus.WARNING;
		} else if (data.charAt(3) == '1') {
			this.periodicCheck = PeriodicCheckStatus.EXPIRED;
		} else {
			this.periodicCheck = PeriodicCheckStatus.OK;
		}
	}
}