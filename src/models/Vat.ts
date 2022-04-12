import { IVat } from "../interfaces/IVat"
import { AbstractParser } from "./AbstractParser"

/**
 * @inheritdoc
 *
 * @export
 * @class Vat
 * @typedef {Vat}
 * @extends {AbstractParser}
 * @implements {IVat}
 */
export class Vat extends AbstractParser implements IVat {
	/**
	 * @inheritdoc
	 */
	id: number;

	/**
	 * @inheritdoc
	 */
	type: string;

	/**
	 * @inheritdoc
	 */
	ateco: string;

	/**
	 * @inheritdoc
	 */
	value: number;

	/**
     * Creates an instance of Vat.
     * @date 1/11/2022 - 12:18:46 PM
     *
     * @constructor
     * @param {string} entry
     */
    constructor(entry: string) {
		super();
		this.id = parseInt(entry.substring(1, 4));
		this.value = parseInt(entry.substring(4, 8));
		this.type = 'VAT';
		let t = parseInt(entry.substring(8, 9));
		switch (t) {
			case 1:
				switch (this.value) {
					case 1:
						this.type = 'EE';
						break;
					case 2:
						this.type = 'NS';
						break;
					case 3:
						this.type = 'NI';
						break;
					case 4:
						this.type = 'ES';
						break;
					case 5:
						this.type = 'RM';
						break;
					case 6:
						this.type = 'AL';
						break;
				}
				break;
			case 2:
				this.type = 'VI';
				break;
			case 0:
			default:
				this.type = 'VAT';
				break;
		}
		this.ateco = entry.substring(9, 15);
	}
}