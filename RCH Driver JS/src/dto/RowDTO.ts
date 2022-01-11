import { BarCodeType } from "./BarCodeType";

/**
 * This is a row of simple text to print in a non fiscal document
 * @date 1/11/2022 - 10:37:05 AM
 *
 * @export
 * @class RowDTO
 * @typedef {RowDTO}
 */
export class RowDTO {
	/**
	 * The text to print or the code for the bar code
	 * @date 1/11/2022 - 10:37:42 AM
	 *
	 * @type {string}
	 */
	text: string = '';

	/**
	 * Optionally specify the type of bar code top print
	 * @date 1/11/2022 - 10:37:54 AM
	 *
	 * @type {?BarCodeType}
	 */
	barCodeType?: BarCodeType;

	/**
	 * True for double size rows
	 * @date 1/11/2022 - 10:38:12 AM
	 *
	 * @type {?boolean}
	 */
	isDouble?: boolean;

	/**
	 * Create a RowDTo from a string.
	 * the string can be plain strings or formatted as follows to include details about barCodeType and size:
	 *
	 * @example
	 * ```js
   * const simpleRow = 'yoursimplerow';
   * const rowDoubleSize = 'yourtextgoeshere||1'; // Double size
   * const barCode = 'thecode|11 //barcode types between 1 to 11
	 * ```
	 * @date 1/11/2022 - 10:47:39 AM
	 *
	 * @static
	 * @param {string} value
	 * @returns {RowDTO}
	 */
	static fromString(value: string): RowDTO {
		let result = {} as RowDTO;
		const regex = /^(?<text>((?!\|).)+)(\|(?<barCodeType>[1-9]|11|10)?(\|(?<isDouble>[01]{1}))?)*?$/;
		let m = regex.exec(value);
		let groups = m?.groups;
		if (groups) {
			result.text = groups['text'];
			if (groups['barCodeType']) {
				result.barCodeType = parseInt(groups['barCodeType']);
			}
			if (groups['isDouble']) {
				result.isDouble = groups['isDouble'] == '1';
			}
		} else {
			result.text = value;
		}
		return result;
	}
}