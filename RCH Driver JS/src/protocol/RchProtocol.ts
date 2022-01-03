import { RchMessage } from "./RchMessage";
import { RchStatus } from "./RchStatus";

export class RchProtocol {
    request: RchMessage;
    response: RchMessage[];
    get responseBody(): string[] {
        return this.response?.filter(r => r.isDump).map(r => r.data) ?? [];
    }
    get responseBodyString(): string {
        return this.responseBody.join('\n');
    }
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
    get isSuccess(): boolean {
        return this.status == RchStatus.OK;
    }

    constructor(request: string) {
        this.request = new RchMessage(request);
        this.response = [];
    }
}