import { IPayment } from "../interfaces/IPayment"
import { AbstractParser } from "./AbstractParser";

/**
 * @inheritdoc
 *
 * @export
 * @class Payment
 * @typedef {Payment}
 * @extends {AbstractParser}
 * @implements {IPayment}
 */
export class Payment extends AbstractParser implements IPayment {
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
	change: boolean;

	/**
	 * @inheritdoc
	 */
	cash: boolean;

	/**
	 * @inheritdoc
	 */
	credit: boolean;

	/**
	 * @inheritdoc
	 */
	drawer: boolean;

	/**
	 * @inheritdoc
	 */
	ticket: boolean;

	/**
	 * @inheritdoc
	 */
	inputTotalAmount: boolean;

	/**
	 * @inheritdoc
	 */
	payDiscount: boolean;

	/**
	 * @inheritdoc
	 */
	creditType: number;

	/**
     * Creates an instance of Payment.
     * @date 1/11/2022 - 12:15:32 PM
     *
     * @constructor
     * @param {string} entry
     */
    constructor(entry: string) {
		super();
		this.id = parseInt(entry.substring(1, 4));
		this.name = entry.substring(4, 24);
		this.name.trim();
		this.change = entry.charAt(24) == '1';
		this.cash = entry.charAt(25) == '1';
		this.creditType = this.indexChartToInt(entry.charCodeAt(26));
		this.credit = this.creditType != 0;
		this.drawer = entry.charAt(27) == '1';
		this.inputTotalAmount = entry.charAt(28) == '1';
		this.ticket = entry.charAt(29) == '1';
		this.payDiscount = entry.charAt(31) == '1';
	}
}