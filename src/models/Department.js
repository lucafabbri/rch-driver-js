"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const AbstractParser_1 = require("./AbstractParser");
class Department extends AbstractParser_1.AbstractParser {
    constructor(firstRow, secondRow) {
        super();
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.id = parseInt(this.firstRow.substring(1, 3));
        this.name = this.firstRow.substring(4, 20);
        this.name.trim();
        this.price = this.parseIntWithDecimal(this.firstRow.substring(24, 10));
        this.halo = this.parseIntWithDecimal(this.secondRow.substring(4, 10));
        this.lalo = this.parseIntWithDecimal(this.secondRow.substring(14, 10));
        this.vatCode = this.indexChartToInt(this.secondRow.charCodeAt(28));
        this.single = this.secondRow.charAt(25) == '1';
        this.groupCode = parseInt(this.secondRow.substring(26, 2));
        this.departmentType = this.indexChartToInt(this.secondRow.charCodeAt(28));
    }
}
exports.Department = Department;
