import { CashierKey } from "./CashierKey";
import { ReceiptStatus } from "./ReceiptStatus";


/**
 * Device Status
 * @date 1/11/2022 - 12:30:57 PM
 *
 * @export
 * @class DeviceStatus
 * @typedef {DeviceStatus}
 */
export class DeviceStatus {
    
    /**
     * Last fiscal document number
     * @date 1/11/2022 - 12:31:16 PM
     *
     * @type {(number | undefined)}
     */
    lastFiscalDocumentNumber: number | undefined;
    
    /**
     * Currency
     * @date 1/11/2022 - 12:31:25 PM
     *
     * @type {(string | undefined)}
     */
    currency: string | undefined;
    
    /**
     * Current cashier key
     * @date 1/11/2022 - 12:31:35 PM
     *
     * @type {(CashierKey | undefined)}
     */
    key: CashierKey | undefined;
    
    /**
     * Status of the receipt if any
     * @date 1/11/2022 - 12:31:43 PM
     *
     * @type {(ReceiptStatus | undefined)}
     */
    receiptStatus: ReceiptStatus | undefined;
    
    /**
     * Current error code if any
     * @date 1/11/2022 - 12:31:55 PM
     *
     * @type {(number | undefined)}
     */
    errorCode: number | undefined;

    /**
     * Creates an instance of DeviceStatus.
     * @date 1/11/2022 - 12:32:03 PM
     *
     * @constructor
     * @param {string} status
     */
    constructor(status: string){
        const regex = /^(?<errorCode>[0-9]{4})(?<receiptStatus>[0-9]{2})(?<key>[LRXZPS])(?<currency>[E])(?<lastFiscalDocumentNumber>[0-9]{4})$/;
        if (regex.test(status)) {
            var match = regex.exec(status);
            if (match != undefined) {
                var groups = match.groups;
                if (groups != undefined) {
                    this.errorCode = parseInt(groups["errorCode"]);
                    this.receiptStatus = parseInt(groups["receiptStatus"]) as ReceiptStatus;
                    this.key = groups["key"] as CashierKey;
                    this.currency = groups["currency"];
                    this.lastFiscalDocumentNumber = parseInt(groups["lastFiscalDocumentNumber"]);
                }
            }
        }
    }
}