import { ConnectionConst } from "./ConnectionConst";

/**
 * Driver configuration
 * @date 1/11/2022 - 6:33:14 PM
 *
 * @export
 * @interface DriverConfiguration
 * @typedef {DriverConfiguration}
 */
export interface DriverConfiguration {
	connection: ConnectionConst;
	comPort?: string;
	baudRate?: number;
	ip?: string;
	ipPort?: number;
}
