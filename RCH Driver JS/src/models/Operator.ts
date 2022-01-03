import { IOperator } from "../interfaces/operator"
export class Operator implements IOperator {
    id: number;
    name: string;

    constructor(entry: string) {
        this.id = parseInt(entry.substring(1, 4));
        this.name = entry.substring(4, 24);
        this.name.trim();
    }
}