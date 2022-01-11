
/**
 * Receipt status
 * @date 1/11/2022 - 12:38:03 PM
 *
 * @export
 * @enum {number}
 */
export enum ReceiptStatus {
	
	/**
	 * No receipt or document
	 * @date 1/11/2022 - 12:38:10 PM
	 */
	IDLE = 0,
	
	/**
	 * A fiscal document has started
	 * @date 1/11/2022 - 12:38:18 PM
	 */
	FISCAL_TRANSITION = 1,
	
	/**
	 * The payment phase has started
	 * @date 1/11/2022 - 12:38:29 PM
	 */
	FISCAL_PAYMENT = 2,
	
	/**
	 * Aplha input
	 * @date 1/11/2022 - 12:38:38 PM
	 */
	ALPHA_INPUT = 3,
	
	/**
	 * Waiting a temrination command
	 * @date 1/11/2022 - 12:38:45 PM
	 */
	WAITING_TERMINATION = 4
}