import { IHeadingRow } from "../interfaces/IHeadingRow";

/**
 * @inheritdoc
 *
 * @export
 * @class HeadingRow
 * @typedef {HeadingRow}
 * @implements {IHeadingRow}
 */
export class HeadingRow implements IHeadingRow {
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
     * Creates an instance of HeadingRow.
     * @date 1/11/2022 - 12:13:52 PM
     *
     * @constructor
     * @param {string} firstRow
     * @param {string} secondRow
     */
    constructor(firstRow: string, secondRow: string) {
		this.firstRow = firstRow;
		this.secondRow = secondRow;
		this.id = parseInt(this.firstRow.substring(1, 4));
		this.name =
			this.firstRow.substring(4, 28) + this.secondRow.substring(4, 28);
		this.name.trim();
	}
}