import { ComConst, Utils } from "..";
import { ReceiptStatus } from "../printer/ReceiptStatus";

/**
 * Encapsulate a protocol message
 * @date 1/11/2022 - 12:40:19 PM
 *
 * @export
 * @class RchMessage
 * @typedef {RchMessage}
 */
export class RchMessage {
    
    /**
     * Address of the printer
     * @date 1/11/2022 - 12:40:29 PM
     *
     * @type {(number)}
     */
    adds?: number;
    
    /**
     * The length of the data
     * @date 1/11/2022 - 12:41:32 PM
     *
     * @type {number}
     */
    length: number;
    
    /**
     * Type of protocol 'N' stands for New protocol
     * @date 1/11/2022 - 12:41:47 PM
     *
     * @type {?string}
     */
    protocol?: string;
    
    /**
     * Packet id it can be a value between [0-9a-zA-Z]
     * The printer will send back the Packet Id Modulus
     * @date 1/11/2022 - 12:42:01 PM
     *
     * @type {string}
     */
    packetId: string = "";
    
    /**
     * Packet id Modulus equals to PachetId Hex Value % 10
     * @date 1/11/2022 - 12:42:55 PM
     *
     * @type {string}
     */
    packetIdModulus: string = "";
    
    /**
     * Checksum calculated including all fields but checksum itself and ETX (STX is included)
     * @date 1/11/2022 - 12:43:24 PM
     *
     * @type {?string}
     */
    checksum?: string;
    
    /**
     * The calculated Checksum to counter proof
     * @date 1/11/2022 - 12:43:55 PM
     *
     * @type {?string}
     */
    checksumCalculated?: string;
    
    /**
     * Wheteher the Checksum is verified against the calculated
     * @date 1/11/2022 - 12:44:13 PM
     *
     * @type {boolean}
     */
    checksumVerified: boolean = false;
    
    /**
     * Control code represents usually the family of commands in non dump messages
     * @date 1/11/2022 - 12:44:30 PM
     *
     * @type {?string}
     */
    controlCode?: string;
    
    /**
     * Error Type
     * N = no error
     * G = generic error
     * S = blocking error
     * P = paper out
     * @date 1/11/2022 - 12:44:57 PM
     *
     * @type {?string}
     */
    errorType?: string = "";
    
    /**
     * Error Code 3 digits see protocol documentation
     * @date 1/11/2022 - 12:45:05 PM
     *
     * @type {?string}
     */
    errorCode?: string = "";
    
    /**
     * The status of the receipt
     * @date 1/11/2022 - 12:46:30 PM
     *
     * @type {?ReceiptStatus}
     */
    receiptStatus?: ReceiptStatus;
    
    /**
     * Whether another message follows, only for responses
     * @date 1/11/2022 - 12:46:39 PM
     *
     * @type {boolean}
     */
    follow: boolean = false;
    
    /**
     * Data Package
     * @date 1/11/2022 - 12:47:14 PM
     *
     * @type {string}
     */
    data: string = "";
    
    /**
     * Raw message excluding STX and ETX
     * @date 1/11/2022 - 12:47:20 PM
     *
     * @type {string}
     */
    raw: string;
    
    /**
     * Return if it is error, in error response the control code is E
     * @date 1/11/2022 - 12:47:39 PM
     *
     * @readonly
     * @type {boolean}
     */
    get isError(): boolean {
        if (this.controlCode) {
            return this.controlCode == 'E';
        } else {
            return false;
        }
    }
    
    /**
     * Whether the message is a non protocol text message
     * @date 1/11/2022 - 12:48:13 PM
     *
     * @type {boolean}
     */
    isDump: boolean;

    
    /**
     * Creates an instance of RchMessage.
     * @date 1/11/2022 - 12:48:36 PM
     *
     * @constructor
     * @param {string} raw
     */
    constructor(raw: string) {
        const regex = /^(?<adds>\d{2})(?<length>\d{3})(?<protocol>[a-zA-Z])(?<controlCode>[\x20-\x7F])(?<data>((?<errorType>[NGSP])(?<errorCode>[0-9]{4})(?<receiptStatus>[0-9]{2})(?<follow>[01])[\x20-\x7F])|[\x20-\x7F]*)(?<packetId>[0-9a-zA-Z])(?<checksum>[0-9A-F]{2})$/;
        this.raw = raw;
        this.data = raw;
        this.length = raw.length;
        this.isDump = !regex.test(raw);
        if (!this.isDump) {
            var match = regex.exec(raw);
            if (match != undefined) {
                var groups = match.groups;
                if (groups != undefined) {
                    this.adds = parseInt(groups["adds"]);
                    this.length = parseInt(groups["length"]);
                    this.protocol = groups["protocol"];
                    this.data = groups["data"];
                    if (groups["packetId"]) {
                        this.packetId = groups['packetId'];
                        let code = this.packetId?.charCodeAt(0);
                        if (code) {
                            this.packetIdModulus = (code % 10).toString();
                        }
                    }
                    this.checksum = groups["checksum"];
                    this.checksumCalculated = Utils.calculateBccFromString(Buffer.from([ComConst.CHR_STX]).toString("ascii")+raw.slice(0, raw.length - 2));
                    if (this.checksum) {
                        this.checksumVerified = this.checksumCalculated == this.checksum;
                    }
                    this.controlCode = groups["controlCode"];
                    this.errorCode = groups["errorCode"];
                    this.errorType = groups["errorType"];
                    if (groups["receiptStatus"]) {
                        this.receiptStatus = parseInt(groups["receiptStatus"]) as ReceiptStatus;
                    }
                    if (groups["follow"]) {
                        this.follow = groups["follow"] == '1';
                    }
                }
            }
        }
    }
}