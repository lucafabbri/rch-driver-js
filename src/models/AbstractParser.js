"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractParser = void 0;
class AbstractParser {
    constructor() {
        this.vatIndexes = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde";
    }
    parseIntWithDecimal(value) {
        return parseInt(value.substring(0, 10));
    }
    indexChartToInt(c) {
        return this.vatIndexes.indexOf(String.fromCharCode(c));
    }
    indexIntToChar(i) {
        return this.vatIndexes.charAt(i);
    }
}
exports.AbstractParser = AbstractParser;
