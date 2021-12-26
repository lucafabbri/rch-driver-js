export class ProtocolResponse {
    isError: boolean;
    errorCode: string;
    payload: string;
    raw: string;

    constructor(raw: string) {
        this.raw = raw;
        this.isError = raw.length > 5 ? raw.charAt(5) == 'E' : false;
        this.errorCode = this.isError ? raw.substring(6, 4) : "";
        this.payload = raw.length > 17 ? raw.substring(7, raw.length - 10) : raw;
    }
}