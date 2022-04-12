import { ConnectionConst } from '../ConnectionConst';
import { DeviceType } from '../DeviceType';
import { IProg } from './IProg';

/**
 * Describes the information of a Device
 * @date 1/11/2022 - 11:01:55 AM
 *
 * @export
 * @interface IDevice
 * @typedef {IDevice}
 */
export interface IDevice {
	/**
	 * If the device has programming dump feature available
	 * @date 1/11/2022 - 11:02:27 AM
	 *
	 * @type {Boolean}
	 */
	hasProgDump: Boolean;

	/**
	 * If the device has dgfe info dump feature available
	 * @date 1/11/2022 - 11:03:15 AM
	 *
	 * @type {Boolean}
	 */
	hasDgfeFreeSpace: Boolean;

	/**
	 * The number of departments
	 * @date 1/11/2022 - 11:03:35 AM
	 *
	 * @type {Number}
	 */
	nDepartments: Number;

	/**
	 * The number ov Vats
	 * @date 1/11/2022 - 11:03:44 AM
	 *
	 * @type {Number}
	 */
	nVats: Number;

	/**
	 * The number of Payments
	 * @date 1/11/2022 - 11:03:56 AM
	 *
	 * @type {Number}
	 */
	nPayments: Number;

	/**
	 * The number of operators
	 * @date 1/11/2022 - 11:04:04 AM
	 *
	 * @type {Number}
	 */
	nOperators: Number;

	/**
	 * The Serial Number
	 * @date 1/11/2022 - 11:04:15 AM
	 *
	 * @type {String}
	 */
	serialNumber: String;

	/**
	 * The type of Device
	 * @date 1/11/2022 - 11:04:30 AM
	 *
	 * @type {String}
	 */
	type: DeviceType;

	/**
	 * The connection type
	 * @date 1/11/2022 - 11:41:35 AM
	 *
	 * @type {ConnectionConst}
	 */
	connection: ConnectionConst;

	/**
	 * The ip of the printer if connected via TCPIP
	 * @date 1/11/2022 - 11:41:59 AM
	 *
	 * @type {String}
	 */
	ip: String;

	/**
	 * The IpPort if connected via TCPIP
	 * @date 1/11/2022 - 11:42:48 AM
	 *
	 * @type {Number}
	 */
	ipPort: Number;

	/**
	 * The comPort if connected via SERIAL
	 * @date 1/11/2022 - 11:43:01 AM
	 *
	 * @type {String}
	 */
	comPort: String;

	/**
	 * The BaudRate if connected via SERIAL
	 * @date 1/11/2022 - 11:43:17 AM
	 *
	 * @type {Number}
	 */
	baudRate: Number;

	/**
	 * The hostname if available
	 * @date 1/11/2022 - 11:43:31 AM
	 *
	 * @type {String}
	 */
	hostName: String;

	/**
	 * The MAC Address if connected via TCPIP
	 * @date 1/11/2022 - 11:43:42 AM
	 *
	 * @type {String}
	 */
	macAddress: String;

	/**
	 * Full Firmware version label
	 * @date 1/11/2022 - 11:43:56 AM
	 *
	 * @type {String}
	 */
	fwVersionLabel: String;

	/**
	 * Short Firmware version label
	 * @date 1/11/2022 - 11:44:08 AM
	 *
	 * @type {String}
	 */
	fwVersion: String;

	/**
	 * The device is active. This flag is managed by the software saving info of the device.
	 * @date 1/11/2022 - 11:44:23 AM
	 *
	 * @type {Boolean}
	 */
	active: Boolean;

	/**
	 * The device programming if available
	 * @date 1/11/2022 - 11:45:14 AM
	 *
	 * @type {IProg}
	 */
	prog: IProg;
}
