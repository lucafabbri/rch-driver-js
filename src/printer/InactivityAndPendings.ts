import { DateTime } from "luxon";

/**
 * Inactivity And Pendings
 * @date 1/11/2022 - 12:34:09 PM
 *
 * @export
 * @class InactivityAndPendings
 * @typedef {InactivityAndPendings}
 */
export class InactivityAndPendings {
	/**
	 * The cashier is inactive
	 * @date 1/11/2022 - 12:34:54 PM
	 *
	 * @type {(boolean | null)}
	 */
	inactive?: boolean;

	/**
	 * Number of pending files
	 * @date 1/11/2022 - 12:35:35 PM
	 *
	 * @type {?number}
	 */
	pendingFiles?: number;

	/**
	 * Max pending files default is 25
	 * @date 1/11/2022 - 12:35:54 PM
	 *
	 * @type {number}
	 */
	maxPendingFiles: number = 25;

	/**
	 * First pending file datetime
	 * @date 1/11/2022 - 12:23:04 PM
	 *
	 * @type {?Date}
	 */
	firstPendingFileDateTime?: Date;

	/**
	 * Creates an instance of InactivityAndPendings.
	 * @date 1/11/2022 - 12:36:19 PM
	 *
	 * @constructor
	 * @param {string} data
	 */
	constructor(data: string) {
		const regex = /^(?<inactivity>[01]) *(?<pendingFiles>[\d]{1,2})\/(?<maxPendingFiles>[1][1]|[2][5]) ?(?<firstPendingFileDateTime>[\d]{2}\/[\d]{2}\/[\d]{4} [\d]{2}:[\d]{2}:[\d]{2})?$/;
		var match = regex.exec(data);
		if (match) {
			var groups = match?.groups;
			if (groups) {
				this.inactive = groups['inactive'] == '1';
				this.pendingFiles = parseInt(groups['pendingFiles']);
				this.maxPendingFiles = parseInt(groups['maxPendingFiles']);
				if (groups['firstPendingFileDateTime']) {
					this.firstPendingFileDateTime = DateTime.fromFormat(groups['firstPendingFileDateTime'],'dd-LL-yyyy HH:mm').toJSDate();
				}
			}
		}
	}
}