"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtesyLine = void 0;
class CourtesyLine {
    constructor(firstRow, secondRow) {
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.id = parseInt(this.firstRow.substring(1, 3));
        this.name = (this.firstRow.substring(4, 24) + this.secondRow.substring(4, 24));
        this.name.trim();
    }
}
exports.CourtesyLine = CourtesyLine;
