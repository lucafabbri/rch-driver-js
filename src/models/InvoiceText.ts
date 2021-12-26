import { IInvoiceText } from "../interfaces/invoiceText"
export class InvoiceText implements IInvoiceText {
    firstRow: string;
    secondRow: string;
    id: number;
    name: string;
    enabled: boolean;

    constructor(firstRow: string, secondRow: string) {
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.enabled = this.firstRow.charAt(4) == '1';
        this.id = parseInt(this.firstRow.substring(5, 1));
        this.name = (this.firstRow.substring(10, 24) + this.secondRow.substring(10, 24));
        this.name.trim();
    }
}