
/**
 * Payment details of a CLosure Document
 * @date 1/11/2022 - 3:46:05 PM
 *
 * @export
 * @class ClosurePayment
 * @typedef {ClosurePayment}
 * @see Closure
 */
export class ClosurePayment{
	
	/**
	 * Description of the payment
	 * @date 1/11/2022 - 3:46:39 PM
	 *
	 * @type {(string | undefined)}
	 */
	description: string | undefined;
	
	/**
	 * monetary value of the payment
	 * @date 1/11/2022 - 3:46:51 PM
	 *
	 * @type {(number | undefined)}
	 */
	value: number | undefined;

}