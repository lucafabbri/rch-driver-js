import { DiscountDTO } from "./DiscountDTO";
import { SellType } from "./SellType";

/**
 * Information of a BillItem in a Bill
 * @date 1/11/2022 - 10:19:19 AM
 *
 * @export
 * @interface LineItemDTO
 * @typedef {LineItemDTO}
 * @see BillDTO
 */
export class LineItemDTO {
	/**
	 * The quantity of the good or service sold
	 * @date 1/11/2022 - 10:20:24 AM
	 *
	 * @type {number}
	 */
	quantity: number = 1;

	/**
	 * Price of the good or service sold
	 * @date 1/11/2022 - 10:20:37 AM
	 *
	 * @type {number}
	 */
	price: number = 100;

	/**
	 * The description of the good or service sold
	 * @date 1/11/2022 - 10:21:52 AM
	 *
	 * @type {string}
	 */
	description: string = '';

	/**
	 * The fiscal department id of the good or service sold
	 * @date 1/11/2022 - 10:21:31 AM
	 *
	 * @type {number}
	 */
	departmentId: number = 1;

	/**
	 * The discount information of the good or service sold
	 * @date 1/11/2022 - 10:21:13 AM
	 *
	 * @type {?DiscountDTO}
	 */
	discount?: DiscountDTO;

	/**
	 * The sell type of the good or service sold
	 * @date 1/11/2022 - 10:20:58 AM
	 *
	 * @type {?SellType}
	 */
	sellType?: SellType;
}