import { AbstractParser } from "./AbstractParser"
import { IDepartment } from "../interfaces/IDepartment"


/**
 * @inheritdoc
 *
 * @export
 * @class Department
 * @typedef {Department}
 * @extends {AbstractParser}
 * @implements {IDepartment}
 */
export class Department extends AbstractParser implements IDepartment {
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
	departmentType: number;

	/**
	 * @inheritdoc
	 */
	price: number;

	/**
	 * @inheritdoc
	 */
	halo: number;

	/**
	 * @inheritdoc
	 */
	lalo: number;

	/**
	 * @inheritdoc
	 */
	single: boolean;

	/**
	 * @inheritdoc
	 */
	vatCode: number;

	/**
	 * @inheritdoc
	 */
	groupCode: number;

    
	/**
     * Creates an instance of Department.
     * @date 1/11/2022 - 12:12:44 PM
     *
     * @constructor
     * @param {string} firstRow
     * @param {string} secondRow
     */
    constructor(firstRow: string, secondRow: string) {
		super();
		this.firstRow = firstRow;
		this.secondRow = secondRow;
		this.id = parseInt(firstRow.substring(1, 4));
		this.name = firstRow.substring(4, 24);
		this.name.trim();
		this.price = this.parseIntWithDecimal(firstRow.substring(24, 34));
		this.halo = this.parseIntWithDecimal(secondRow.substring(4, 14));
		this.lalo = this.parseIntWithDecimal(secondRow.substring(14, 24));
		this.vatCode = this.indexChartToInt(secondRow.charCodeAt(28));
		this.single = secondRow.charAt(25) == '1';
		this.groupCode = parseInt(secondRow.substring(26, 28));
		this.departmentType = this.indexChartToInt(secondRow.charCodeAt(28));
	}
}