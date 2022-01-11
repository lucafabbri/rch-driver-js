import { ComConst } from "..";


/**
 * Utilities
 * @date 1/11/2022 - 3:11:12 PM
 *
 * @export
 * @class Utils
 * @typedef {Utils}
 */
export class Utils {
	/**
	 * Correct old version Serial Number (before RT) to RT format.
	 * returns the string if it starts with 72 (RCH default)
	 * @date 1/11/2022 - 3:12:12 PM
	 *
	 * @static
	 * @param {string} serialNumber
	 * @returns {string}
	 */
	static toRtFormat(serialNumber: string): string {
		if (serialNumber.startsWith('72')) {
			return serialNumber;
		} else {
			return (
				'72M' +
				serialNumber.substring(0, 2) +
				serialNumber.substring(4)
			).replace(' ', '');
		}
	}

	/**
	 * Calculate the BCC of a bytearray to be sent to the printer.
	 * @date 1/11/2022 - 3:12:21 PM
	 *
	 * @static
	 * @param {number[]} items
	 * @returns {string}
	 */
	static calculateBcc(items: number[]): string {
		var result: number = 0;
		items.forEach((n) => {
			if (n != ComConst.CHR_ETX) {
				if (n == ComConst.CHR_STX) {
					result = ComConst.CHR_STX;
				} else {
					result = result ^ n;
				}
			}
		});
		return result.toString(16).padStart(2, '0').toUpperCase();
	}

	/**
	 * Calculate the BCC of a string to be sent to the printer.
	 * @date 1/11/2022 - 3:12:57 PM
	 *
	 * @static
	 * @param {string} item
	 * @returns {string}
	 */
	static calculateBccFromString(item: string): string {
		return Utils.calculateBcc([...item].map((c) => c.charCodeAt(0)));
	}
}