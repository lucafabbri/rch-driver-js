import { IInvoiceText } from "../interfaces/IInvoiceText"

/**
 * @inheritdoc
 *
 * @export
 * @class InvoiceText
 * @typedef {InvoiceText}
 * @implements {IInvoiceText}
 */
export class InvoiceText implements IInvoiceText {
	/**
	 * @inheritdoc
	 */
	firstRow: string;

	/**
	 * @inheritdoc
	 */
	secondRow: string;

	/**
	 * @inheritdoc
	 */
	id: number;

	/**
	 * @inheritdoc
	 */
	name: string;

	/**
	 * @inheritdoc
	 */
	enabled: boolean;

	/**
     * Creates an instance of InvoiceText.
     * @date 1/11/2022 - 12:14:22 PM
     *
     * @constructor
     * @param {string} firstRow
     * @param {string} secondRow
     */
    constructor(firstRow: string, secondRow: string) {
		this.firstRow = firstRow;
		this.secondRow = secondRow;
		this.enabled = this.firstRow.charAt(4) == '1';
		this.id = parseInt(this.firstRow.substring(5, 6));
		this.name =
			this.firstRow.substring(10, 34) + this.secondRow.substring(10, 34);
		this.name.trim();
	}
}