import { IPayment } from "../interfaces/payment"
import { AbstractParser } from "./AbstractParser";
export class Payment extends AbstractParser implements IPayment {
    id: number;
    name: string;
    change: boolean;
    cash: boolean;
    credit: boolean;
    drawer: boolean;
    ticket: boolean;
    inputTotalAmount: boolean;
    payDiscount: boolean;
    creditType: number;

    constructor(entry: string) {
        super()
        this.id = parseInt(entry.substring(1, 3));
        this.name = entry.substring(4, 20);
        this.name.trim();
        this.change = entry.charAt(24) == '1';
        this.cash = entry.charAt(25) == '1';
        this.creditType = this.indexChartToInt(entry.charCodeAt(26));
        this.credit = this.creditType != 0;
        this.drawer = entry.charAt(27) == '1';
        this.inputTotalAmount = entry.charAt(28) == '1';
        this.ticket = entry.charAt(29) == '1';
        this.payDiscount = entry.charAt(31) == '1';
    }
}