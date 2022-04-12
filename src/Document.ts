
/**
 * Document in the DGFE
 * @date 1/11/2022 - 3:18:40 PM
 *
 * @export
 * @class Document
 * @typedef {Document}
 */
export class Document {
	
	/**
	 * RAW representation of the document in the DGFE
	 * @date 1/11/2022 - 3:18:50 PM
	 *
	 * @type {string}
	 */
	raw: string = '';
	
	/**
	 * Gets the RAW document as array of strings, one per row (CR)
	 * @date 1/11/2022 - 3:19:05 PM
	 *
	 * @readonly
	 * @type {Array<string>}
	 */
	get rows(): Array<string> {
		return this.raw.split('\n');
	}
	
	/**
	 * Number of the document
	 * @date 1/11/2022 - 3:19:40 PM
	 *
	 * @type {number}
	 */
	number: number = 0;
	
	/**
	 * Closure number
	 * @date 1/11/2022 - 3:19:50 PM
	 *
	 * @type {number}
	 */
	closure: number = 0;
	
	/**
	 * Date of the document
	 * @date 1/11/2022 - 3:19:59 PM
	 *
	 * @type {?Date}
	 */
	date?: Date;
	
	/**
	 * Serial number of the Device which print it
	 * @date 1/11/2022 - 3:20:06 PM
	 *
	 * @type {?string}
	 */
	serialNumber?: string;
}