import { AbstractParser } from "./AbstractParser"
import { IDepartment } from "../interfaces/department"

export class Department extends AbstractParser implements IDepartment {
    firstRow: string;
    secondRow: string;
    id: number;
    name: string;
    departmentType: number;
    price: number;
    halo: number;
    lalo: number;
    single: boolean;
    vatCode: number;
    groupCode: number;

    constructor(firstRow: string, secondRow: string) {
        super();
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.id = parseInt(firstRow.substring(1, 4));
        this.name = firstRow.substring(4, 24);
        this.name.trim();
        this.price = this.parseIntWithDecimal(firstRow.substring(24, 34));
        this.halo = this.parseIntWithDecimal(secondRow.substring(4, 14));
        this.lalo = this.parseIntWithDecimal(secondRow.substring(14, 24));
        this.vatCode = this.indexChartToInt(secondRow.charCodeAt(28));
        this.single = secondRow.charAt(25) == '1';
        this.groupCode = parseInt(secondRow.substring(26, 28));
        this.departmentType = this.indexChartToInt(secondRow.charCodeAt(28));
    }
}