import { IOperator } from "../interfaces/IOperator"

/**
 * @inheritdoc
 *
 * @export
 * @class Operator
 * @typedef {Operator}
 * @implements {IOperator}
 */
export class Operator implements IOperator {
	/**
	 * @inheritdoc
	 */
	id: number;

	/**
	 * @inheritdoc
	 */
	name: string;

	/**
     * Creates an instance of Operator.
     * @date 1/11/2022 - 12:15:07 PM
     *
     * @constructor
     * @param {string} entry
     */
    constructor(entry: string) {
		this.id = parseInt(entry.substring(1, 4));
		this.name = entry.substring(4, 24);
		this.name.trim();
	}
}