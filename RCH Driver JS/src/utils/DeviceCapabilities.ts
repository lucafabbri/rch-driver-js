import { DeviceType } from "..";
import { IProg } from "../interfaces/IProg";

/**
 * Device capabilites
 * @date 1/11/2022 - 2:11:48 PM
 *
 * @export
 * @interface DeviceCapabilites
 * @typedef {DeviceCapabilites}
 */
export interface DeviceCapabilites {
	/**
	 * Type of device
	 * @date 1/11/2022 - 2:11:57 PM
	 *
	 * @type {DeviceType}
	 */
	type: DeviceType;

	/**
	 * Firmware version
	 * @date 1/11/2022 - 2:12:07 PM
	 *
	 * @type {string}
	 */
	fwVersion: string;

	/**
	 * Whether the device has Programming dump capability
	 * @date 1/11/2022 - 2:14:58 PM
	 *
	 * @type {boolean}
	 */
	hasProgDump: boolean;

	/**
	 * Whether the device has DGFE status dump capability
	 * @date 1/11/2022 - 2:14:38 PM
	 *
	 * @type {boolean}
	 */
	hasDgfeFreeSpace: boolean;

	/**
	 * Max number of Departments for the device type
	 * @date 1/11/2022 - 2:14:20 PM
	 *
	 * @see IDepartment
	 * @type {number}
	 */
	nDepartments: number;

	/**
	 * Max number of Vats for the device type
	 * @date 1/11/2022 - 2:13:38 PM
	 *
	 * @see IVat
	 * @type {number}
	 */
	nVats: number;

	/**
	 * Max number of Payments for the device type
	 * @date 1/11/2022 - 2:13:23 PM
	 *
	 * @see IPayment
	 * @type {number}
	 */
	nPayments: number;

	/**
	 * Max number of Operators for the device type
	 * @date 1/11/2022 - 2:13:04 PM
	 *
	 * @see IOperator
	 * @type {number}
	 */
	nOperators: number;

	/**
	 * If this is the current default for the device type
	 * @date 1/11/2022 - 2:12:49 PM
	 *
	 * @type {boolean}
	 */
	isDefault: boolean;

	/**
	 * Default programming (factory) for the current device.
	 * @date 1/11/2022 - 2:12:18 PM
	 *
	 * @type {(IProg | null | undefined)}
	 */
	defaultProg: IProg | null | undefined;
}