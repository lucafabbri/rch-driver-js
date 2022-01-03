import { CashierKey } from "./CashierKey";
import { ReceiptStatus } from "./ReceiptStatus";

export class DeviceStatus {
    lastFiscalDocumentNumber: number | undefined;
    currency: string | undefined;
    key: CashierKey | undefined;
    receiptStatus: ReceiptStatus | undefined;
    errorCode: number | undefined;

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