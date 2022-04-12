import { RchMessage } from "./RchMessage";
import { RchStatus } from "./RchStatus";

/**
 * Represents the a complete request/response in RCH Protocol
 * @date 1/11/2022 - 2:06:01 PM
 *
 * @export
 * @class RchProtocol
 * @typedef {RchProtocol}
 */
export class RchProtocol {
	/**
	 * The request message
	 * @date 1/11/2022 - 2:06:38 PM
	 *
	 * @type {RchMessage}
	 */
	request: RchMessage;

	/**
	 * The response messages. They might include dumps, responses or errors
	 * @date 1/11/2022 - 2:07:56 PM
	 *
	 * @type {RchMessage[]}
	 */
	response: RchMessage[];

	/**
	 * Check responses are of the same packetid sent in request
	 * @date 1/11/2022 - 2:08:20 PM
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get areResponsesMatchingPacketId(): boolean {
		return this.response
			.map((r) => r.packetId == this.request.packetIdModulus)
			.reduce((a, m) => a && m, true);
	}

	/**
	 * Get the response body as array of strings.
	 * It is used for dump responses.
	 * @date 1/11/2022 - 2:08:46 PM
	 *
	 * @readonly
	 * @type {string[]}
	 */
	get responseBody(): string[] {
		return this.response?.filter((r) => r.isDump).map((r) => r.data) ?? [];
	}

	/**
	 * Get the resposne body as a single string with Carriage return \n.
	 * It is used for dump responses.
	 * @date 1/11/2022 - 2:09:17 PM
	 *
	 * @readonly
	 * @type {string}
	 */
	get responseBodyString(): string {
		return this.responseBody.join('\n');
    }
    
	/**
     * Get the status of the printer which is always passed in non dump response.
     * @date 1/11/2022 - 2:09:59 PM
     *
     * @readonly
     * @type {RchStatus}
     */
    get status(): RchStatus {
		if (this.response.length > 0) {
			var controlCode = this.response[this.response.length - 1].controlCode;
			switch (controlCode) {
				case 'G':
					return RchStatus.PRINTER_BUSY;
				case 'S':
					return RchStatus.PRINTER_BLOCKED;
				case 'P':
					return RchStatus.PRINTER_PAPER_OVER;
				case 'C':
					return RchStatus.PRINTER_COVER_OPEN;
				case 'O':
				case 'N':
				default:
					return RchStatus.OK;
			}
		} else {
			return RchStatus.PENDING;
		}
    }
    
	/**
     * Return the status of the call
     * @date 1/11/2022 - 2:10:26 PM
     *
     * @readonly
     * @type {boolean}
     */
    get isSuccess(): boolean {
		return this.status == RchStatus.OK;
	}

	/**
     * Creates an instance of RchProtocol.
     * @date 1/11/2022 - 2:10:59 PM
     *
     * @constructor
     * @param {string} request
     */
    constructor(request: string) {
		this.request = new RchMessage(request);
		this.response = [];
	}
}