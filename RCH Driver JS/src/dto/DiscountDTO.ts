
/**
 * Discount information applied to a BillItem
 * @date 1/11/2022 - 10:17:38 AM
 *
 * @export
 * @class DiscountDTO
 * @typedef {DiscountDTO}
 * @see BillItemDTO
 */
export class DiscountDTO {
	
	/**
	 * Mandatory Discount description
	 * @date 1/11/2022 - 10:18:24 AM
	 *
	 * @type {string}
	 */
	description: string = "";
	
	/**
	 * Discount value 
	 * @date 1/11/2022 - 10:18:37 AM
	 *
	 * @type {?number}
	 */
	value?: number
	
	/**
	 * Discount percentage
	 * @date 1/11/2022 - 10:19:02 AM
	 *
	 * @type {?number}
	 */
	percent?: number;
}