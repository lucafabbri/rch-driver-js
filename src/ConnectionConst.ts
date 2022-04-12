
/**
 * Conmnection constants
 * @date 1/11/2022 - 3:49:25 PM
 *
 * @export
 * @class ConnectionConst
 * @typedef {ConnectionConst}
 */
export class ConnectionConst {
	
	/**
	 * TCP/IP connection
	 * @date 1/11/2022 - 3:52:41 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly TCPIP: string = 'TCPIP';
	
	/**
	 * Bluetooth connection
	 * @date 1/11/2022 - 3:52:49 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly BT: string = 'BT';
	
	/**
	 * Serial connection
	 * @date 1/11/2022 - 3:52:57 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly SERIAL: string = 'SERIAL';
	
	/**
	 * WebService connection
	 * @date 1/11/2022 - 3:53:05 PM
	 *
	 * @deprecated
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly WS: string = 'WS';
}