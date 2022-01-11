
/**
 * Vat details of a closure document
 * @date 1/11/2022 - 3:47:04 PM
 *
 * @export
 * @class ClosureVat
 * @typedef {ClosureVat}
 * @see Closure
 */
export class ClosureVat {
	/**
	 * Vat id
	 * @date 1/11/2022 - 3:47:21 PM
	 *
	 * @type {(number | undefined)}
	 */
	id: number | undefined;

	/**
	 * Vat percentage or nature
	 * @date 1/11/2022 - 3:47:30 PM
	 *
	 * @type {(string | undefined)}
	 */
	vat: string | undefined;

	/**
	 * Total monetary value of the Vat
	 * @date 1/11/2022 - 3:47:44 PM
	 *
	 * @type {(number | undefined)}
	 */
	total: number | undefined;

	/**
	 * Total of sells for the Vat
	 * @date 1/11/2022 - 3:47:58 PM
	 *
	 * @type {(number | undefined)}
	 */
	sellsGrandTotal: number | undefined;

	/**
	 * Net of sells for the Vat
	 * @date 1/11/2022 - 3:48:08 PM
	 *
	 * @type {(number | undefined)}
	 */
	sellsNetTotal: number | undefined;

	/**
	 * Total Tax of sells for the Vat
	 * @date 1/11/2022 - 3:48:13 PM
	 *
	 * @type {(number | undefined)}
	 */
	sellsVatTotal: number | undefined;
}