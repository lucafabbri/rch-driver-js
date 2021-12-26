"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
class Operator {
    constructor(entry) {
        this.id = parseInt(entry.substring(1, 3));
        this.name = entry.substring(4, 20);
        this.name.trim();
    }
}
exports.Operator = Operator;
