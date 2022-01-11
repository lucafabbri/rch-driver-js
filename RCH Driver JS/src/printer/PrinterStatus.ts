
/**
 * Printer Status
 * @date 1/11/2022 - 12:36:43 PM
 *
 * @export
 * @class PrinterStatus
 * @typedef {PrinterStatus}
 */
export class PrinterStatus {
	
	/**
	 * Current error if any
	 * @date 1/11/2022 - 12:37:03 PM
	 *
	 * @type {boolean}
	 */
	error: boolean = false;
	
	/**
	 * Whether the paper is over
	 * @date 1/11/2022 - 12:37:11 PM
	 *
	 * @type {boolean}
	 */
	paperOver: boolean = false;
	
	/**
	 * The cover is open
	 * @date 1/11/2022 - 12:37:24 PM
	 *
	 * @type {boolean}
	 */
	coverOpen: boolean = false;
	
	/**
	 * Whether the cutter is working properly
	 * @date 1/11/2022 - 12:37:32 PM
	 *
	 * @type {boolean}
	 */
	cutterOk: boolean = false;

	/**
	 * Creates an instance of PrinterStatus.
	 * @date 1/11/2022 - 12:37:45 PM
	 *
	 * @constructor
	 * @param {string} dump
	 */
	constructor(dump: string) {
		this.error = dump.charAt(0) == '1';
		this.paperOver = dump.charAt(1) == '1';
		this.coverOpen = dump.charAt(4) == '1';
		this.cutterOk = dump.charAt(5) == '0';
	}
}