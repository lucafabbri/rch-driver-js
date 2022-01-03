import { Utils } from "..";
import { ReceiptStatus } from "../printer/ReceiptStatus";

export class RchMessage {
    adds: number | null | undefined;
    length: number;
    protocol: string | null | undefined;
    packetId: string | null | undefined;
    checksum: string | null | undefined;
    checksumVerified: boolean = false;
    controlCode: string | null | undefined;
    errorType: string | null | undefined = "";
    errorCode: string | null | undefined = "";
    receiptStatus: ReceiptStatus | null | undefined;
    follow: boolean = false;
    data: string = "";
    raw: string;
    get isError(): boolean {
        if (this.controlCode) {
            return this.controlCode == 'E';
        } else {
            return false;
        }
    }
    isDump: boolean;

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
                    this.packetId = groups["packetId"];
                    this.checksum = groups["checksum"];
                    if (this.checksum) {
                        this.checksumVerified = Utils.calculateBccFromString(groups["data"]) == this.checksum;
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