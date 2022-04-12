import { IAbstractDevice } from "./IAbstractDevice";
import { IProg } from "./interfaces/IProg";

/**
 * ECR device interface
 * @date 1/11/2022 - 4:04:29 PM
 *
 * @export
 * @interface IEcrDevice
 * @typedef {IEcrDevice}
 * @extends {IAbstractDevice}
 */
export interface IEcrDevice extends IAbstractDevice {
	/**
	 * Firmware version
	 * @date 1/11/2022 - 4:01:42 PM
	 *
	 * @type {string}
	 */
	fwVersion: string;

	/**
	 * Firware version label
	 * @date 1/11/2022 - 4:01:49 PM
	 *
	 * @type {string}
	 */
	fwVersionLabel: string;

	/**
	 * Has Programming dumpo capability
	 * @date 1/11/2022 - 4:02:06 PM
	 *
	 * @type {boolean}
	 */
	hasProgDump: boolean;

	/**
	 * Max number of Departments
	 * @date 1/11/2022 - 4:02:24 PM
	 *
	 * @type {number}
	 */
	nDepartments: number;

	/**
	 * Max number of Operators
	 * @date 1/11/2022 - 4:03:06 PM
	 *
	 * @type {number}
	 */
	nOperators: number;

	/**
	 * Max number of Payments
	 * @date 1/11/2022 - 4:02:59 PM
	 *
	 * @type {number}
	 */
	nPayments: number;

	/**
	 * Max number of Vats
	 * @date 1/11/2022 - 4:02:51 PM
	 *
	 * @type {number}
	 */
	nVats: number;

	/**
	 * Device programming
	 * @date 1/11/2022 - 4:02:42 PM
	 *
	 * @type {(IProg | null)}
	 */
	prog: IProg | null;

	/**
	 * Has DGFE dump capbility
	 * @date 1/11/2022 - 4:02:32 PM
	 *
	 * @type {boolean}
	 */
	hasDgfeFreeSpace: boolean;
}