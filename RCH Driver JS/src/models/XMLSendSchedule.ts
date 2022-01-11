import { IXMLSendSchedule } from "../interfaces/IXMLSendSchedule"

/**
 * @inheritdoc
 *
 * @export
 * @class XMLSendSchedule
 * @typedef {XMLSendSchedule}
 * @implements {IXMLSendSchedule}
 */
export class XMLSendSchedule implements IXMLSendSchedule {
	/**
	 * @inheritdoc
	 */
	enabled: boolean;

	/**
	 * @inheritdoc
	 */
	hours: number;

	/**
	 * @inheritdoc
	 */
	minutes: number;

	/**
	 * @inheritdoc
	 */
	startHour: number;

	/**
	 * @inheritdoc
	 */
	endHour: number;

	/**
	 * @inheritdoc
	 */
	standBy: number;

	/**
     * Creates an instance of XMLSendSchedule.
     * @date 1/11/2022 - 12:19:15 PM
     *
     * @constructor
     * @param {string} entry
     */
    constructor(entry: string) {
		this.enabled = entry.charAt(5) == '1';
		this.hours = parseInt(entry.substring(6, 8));
		this.minutes = parseInt(entry.substring(8, 10));
		this.startHour = parseInt(entry.substring(10, 12));
		this.endHour = parseInt(entry.substring(12, 14));
		this.standBy = parseInt(entry.substring(14, 16));
	}
}