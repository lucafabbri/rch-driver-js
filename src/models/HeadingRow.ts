﻿import {IHeadingRow} from "../interfaces/headingRow";
export class HeadingRow implements IHeadingRow {
    firstRow: string;
    secondRow: string;
    id: number;
    name: string;

    constructor(firstRow: string, secondRow: string) {
        this.firstRow = firstRow;
        this.secondRow = secondRow;
        this.id = parseInt(this.firstRow.substring(1, 3));
        this.name = (this.firstRow.substring(4, 24) + this.secondRow.substring(4, 24));
        this.name.trim();
    }
}