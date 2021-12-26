"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceText = void 0;
class InvoiceText {
    constructor(firstRow, secondRow) {
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.enabled = this.firstRow.charAt(4) == '1';
        this.id = parseInt(this.firstRow.substring(5, 1));
        this.name = (this.firstRow.substring(10, 24) + this.secondRow.substring(10, 24));
        this.name.trim();
    }
}
exports.InvoiceText = InvoiceText;
