

/**
 * Class with common functions to parse programming fields from dump
 * @date 1/11/2022 - 12:07:48 PM
 *
 * @export
 * @class AbstractParser
 * @typedef {AbstractParser}
 */
export class AbstractParser {
	private readonly vatIndexes: string =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde';

	/**
	 * Parse an Int that has decimals
	 * @date 1/11/2022 - 12:08:20 PM
	 *
	 * @param {string} value
	 * @returns {number}
	 */
	parseIntWithDecimal(value: string): number {
		return parseInt(value.substring(0, 10));
	}

	/**
	 * Get the char from index
	 * @date 1/11/2022 - 12:08:34 PM
	 *'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde'
	 * @param {number} c
	 * @returns {number}
	 */
	indexChartToInt(c: number): number {
		return this.vatIndexes.indexOf(String.fromCharCode(c));
	}

	/**
	 * Get the index from char
	 * '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde'
	 * @date 1/11/2022 - 12:09:08 PM
	 *
	 * @param {number} i
	 * @returns {string}
	 */
	indexIntToChar(i: number): string {
		return this.vatIndexes.charAt(i);
	}
}
