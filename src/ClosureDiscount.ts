
/**
 * Discount details of a closure document
 * @date 1/11/2022 - 3:44:49 PM
 *
 * @export
 * @class ClosureDiscount
 * @typedef {ClosureDiscount}
 * @see Closure
 */
export class ClosureDiscount{
	
	/**
	 * Whether is a Percentage discount or Value discount
	 * @date 1/11/2022 - 3:45:03 PM
	 *
	 * @type {boolean}
	 */
	isPerc: boolean = false;
	
	/**
	 * The value of discount 
	 * % for percentage
	 * monetary value for value
	 * @date 1/11/2022 - 3:45:25 PM
	 *
	 * @type {(number | undefined)}
	 */
	value: number | undefined;
}