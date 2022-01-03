import {IHeadingRow} from "../interfaces/headingRow";
export class HeadingRow implements IHeadingRow {
    firstRow: string;
    secondRow: string;
    id: number;
    name: string;

    constructor(firstRow: string, secondRow: string) {
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.id = parseInt(this.firstRow.substring(1, 4));
        this.name = (this.firstRow.substring(4, 28) + this.secondRow.substring(4, 28));
        this.name.trim();
    }
}