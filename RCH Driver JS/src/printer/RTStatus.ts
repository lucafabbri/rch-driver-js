
/**
 * RT Status
 * @date 1/11/2022 - 12:38:56 PM
 *
 * @export
 * @class RTStatus
 * @typedef {RTStatus}
 */
export class RTStatus {
	
	/**
	 * Whether the RT is registered
	 * @date 1/11/2022 - 12:39:03 PM
	 *
	 * @type {boolean}
	 */
	registered: boolean = false;
	
	/**
	 * Whether the RT is active
	 * @date 1/11/2022 - 12:39:13 PM
	 *
	 * @type {boolean}
	 */
	active: boolean = false;
	
	/**
	 * Whether is RT, if not is MF
	 * @date 1/11/2022 - 12:39:24 PM
	 *
	 * @type {boolean}
	 */
	rt: boolean = false;
	
	/**
	 * Whether the RT is operating
	 * @date 1/11/2022 - 12:39:35 PM
	 *
	 * @type {boolean}
	 */
	operating: boolean = false;
	
	/**
	 * Whether the RT is revocated
	 * @date 1/11/2022 - 12:39:45 PM
	 *
	 * @type {boolean}
	 */
	revocation: boolean = false;
	
	/**
	 * Whether the RT is decommisioned
	 * @date 1/11/2022 - 12:39:55 PM
	 *
	 * @type {boolean}
	 */
	decommissioned: boolean = false;

	/**
	 * Creates an instance of RTStatus.
	 * @date 1/11/2022 - 12:40:07 PM
	 *
	 * @constructor
	 * @param {string} dump
	 */
	constructor(dump: string) {
		this.registered = dump.charAt(0) == '1';
		this.active = dump.charAt(1) == '1';
		this.rt = dump.charAt(2) == '1';
		this.operating = dump.charAt(3) == '0';
		this.revocation = dump.charAt(4) == '1';
		this.decommissioned = dump.charAt(5) == '1';
	}
}