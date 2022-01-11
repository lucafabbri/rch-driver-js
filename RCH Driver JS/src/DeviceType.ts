
/**
 * Device types
 * @date 1/11/2022 - 3:53:38 PM
 *
 * @export
 * @class DeviceType
 * @typedef {DeviceType}
 */
export class DeviceType {
	/**
	 * Print!F - ECR
	 * @date 1/11/2022 - 3:53:53 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly PRINTF: string = 'PRINTF';

	/**
	 * LDP 33 RT | WALLWEC - ECR
	 * @date 1/11/2022 - 3:54:01 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly LDP33RT: string = 'LDP33RT';

	/**
	 * ONDA RT - ECR
	 * @date 1/11/2022 - 3:54:20 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly ONDART: string = 'ONDART';

	/**
	 * SPOT RT - ECR
	 * @date 1/11/2022 - 3:54:28 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly SPOTRT: string = 'SPOTRT';

	/**
	 * ONDA RT Adattata - ECR
	 * @date 1/11/2022 - 3:54:36 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly ONDARTA: string = 'ONDARTA';

	/**
	 * ABOX Android
	 * @date 1/11/2022 - 3:55:48 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly ABOX: string = 'ABOX';

	/**
	 * LDP 03 - ECR
	 * @date 1/11/2022 - 3:56:20 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly LDP03: string = 'LDP03';

	/**
	 * Walle 8T - Android
	 * @date 1/11/2022 - 3:56:31 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly WALLE8T: string = 'WALLE8T';

	/**
	 * Zero 55 RT - ECR
	 * @date 1/11/2022 - 3:56:45 PM
	 *
	 * @static
	 * @readonly
	 * @type {string}
	 */
	static readonly ZERO55RT: string = 'ZERO55RT';

	static fromSerialNumber(serialNumber: string): string {
		if (serialNumber.startsWith('U1') || serialNumber.startsWith('72MU1')) {
			return DeviceType.PRINTF;
		} else if (
			serialNumber.startsWith('U7') ||
			serialNumber.startsWith('72EU7')
		) {
			return DeviceType.LDP33RT;
		} else if (
			serialNumber.startsWith('U8') ||
			serialNumber.startsWith('72IU8')
		) {
			return DeviceType.ONDART;
		} else if (
			serialNumber.startsWith('U9') ||
			serialNumber.startsWith('72IU9')
		) {
			return DeviceType.SPOTRT;
		} else if (
			serialNumber.startsWith('V5') ||
			serialNumber.startsWith('72EV5')
		) {
			return DeviceType.ONDARTA;
		} else if (
			serialNumber.startsWith('U4') ||
			serialNumber.startsWith('72MU4')
		) {
			return DeviceType.ABOX;
		} else if (
			serialNumber.startsWith('U5') ||
			serialNumber.startsWith('72MU5')
		) {
			return DeviceType.LDP03;
		} else if (
			serialNumber.startsWith('V4') ||
			serialNumber.startsWith('72MV4')
		) {
			return DeviceType.WALLE8T;
		} else if (
			serialNumber.startsWith('V1') ||
			serialNumber.startsWith('72IV1')
		) {
			return DeviceType.ZERO55RT;
		}
		return 'UNKNOW';
	}
}