import { ConnectionConst } from ".";
import { DeviceType } from "./DeviceType";

/**
 * An Abstract Device definition
 * @date 1/11/2022 - 3:13:43 PM
 *
 * @export
 * @interface IAbstractDevice
 * @typedef {IAbstractDevice}
 */
export interface IAbstractDevice {
	/**
	 * Is the device active
	 * @date 1/11/2022 - 3:13:54 PM
	 *
	 * @type {boolean}
	 */
	active: boolean;

	/**
	 * Baudrate if device works over SERIAL
	 * @date 1/11/2022 - 3:14:02 PM
	 *
	 * @type {number}
	 */
	baudRate: number;

	/**
	 * COM port if device works over SERAIL
	 * @date 1/11/2022 - 3:14:18 PM
	 *
	 * @type {string}
	 */
	comPort: string;

	/**
	 * Device connection
	 * @date 1/11/2022 - 3:14:38 PM
	 *
	 * @type {ConnectionConst}
	 */
	connection: ConnectionConst;

	/**
	 * Device hostname if available
	 * @date 1/11/2022 - 3:15:00 PM
	 *
	 * @type {string}
	 */
	hostName: string;

	/**
	 * Device IP if device works over TCPIP
	 * @date 1/11/2022 - 3:15:12 PM
	 *
	 * @type {string}
	 */
	ip: string;

	/**
	 * Device IP port if device works over TCPIP
	 * @date 1/11/2022 - 3:15:32 PM
	 *
	 * @type {number}
	 */
	ipPort: number;

	/**
	 * Device MAC Address if device works over TCPIP
	 * @date 1/11/2022 - 3:15:44 PM
	 *
	 * @type {string}
	 */
    macAddress: string;
    
	/**
     * Part Number of device if available
     * @date 1/11/2022 - 3:15:56 PM
     *
     * @type {string}
     */
    partNumber: string;
    
	/**
     * Serial Number
     * @date 1/11/2022 - 3:16:10 PM
     *
     * @type {string}
     */
    serialNumber: string;
    
	/**
     * Device Type
     * @date 1/11/2022 - 3:16:18 PM
     *
     * @type {DeviceType}
     */
    type: DeviceType;
}