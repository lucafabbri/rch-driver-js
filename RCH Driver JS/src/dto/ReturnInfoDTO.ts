
/**
 * Mandatory information for a RETURN or CANCEL document issue
 * @date 1/11/2022 - 10:33:57 AM
 *
 * @export
 * @class ReturnInfoDTO
 * @typedef {ReturnInfoDTO}
 * @see BillDTO
 */
export class ReturnInfoDTO {
	/**
	 * Mandatory date of the document to Return or Cancel
	 * @date 1/11/2022 - 10:34:53 AM
	 *
	 * @type {!Date}
	 */
	date!: Date;

	/**
	 * Mandatory closure number of the document to Return or Cancel
	 * @date 1/11/2022 - 10:35:11 AM
	 *
	 * @type {!number}
	 */
	closure!: number;

	/**
	 * Mandatory number of the document to Return or Cancel
	 * @date 1/11/2022 - 10:35:33 AM
	 *
	 * @type {!number}
	 */
	number!: number;
	
	/**
	 * Flag for only checking if the document is returnable
	 * @date 1/11/2022 - 10:35:52 AM
	 *
	 * @type {?boolean}
	 */
	onlyCheck?: boolean;
	
	/**
	 * Optional Serial Number of the printer that printed the document
	 * @date 1/11/2022 - 10:36:28 AM
	 *
	 * @type {?string}
	 */
	serialNumber?: string;
}