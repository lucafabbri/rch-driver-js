
/**
 * The Payment details
 * @date 1/11/2022 - 10:29:11 AM
 *
 * @export
 * @class PaymentItemDTO
 * @typedef {PaymentItemDTO}
 * @see BillDTO
 */
export class PaymentItemDTO {
	
	/**
	 * The Payment ID
	 * @date 1/11/2022 - 10:29:33 AM
	 *
	 * @type {number}
	 */
	paymentId: number = 1;
	
	/**
	 * The value of the payment, if no value is giving the payment will cover the whole amount of the Bill
	 * @date 1/11/2022 - 10:29:46 AM
	 *
	 * @type {number}
	 */
	value?: number;
	
	/**
	 * This is the quantity of Tickets.
	 * This field must be filled if the Payment used is of the kind of Ticket
	 * @date 1/11/2022 - 10:30:55 AM
	 *
	 * @type {?number}
	 */
	ticketQty?: number;
	
	/**
	 * Option Payment description, falls back to Payment description saved on printer
	 * @date 1/11/2022 - 10:31:45 AM
	 *
	 * @type {?string}
	 */
	description?: string;
}