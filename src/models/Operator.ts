import { IOperator } from "../interfaces/operator"
export class Operator implements IOperator {
    id: number;
    name: string;

    constructor(entry: string) {
        this.id = parseInt(entry.substring(1, 3));
        this.name = entry.substring(4, 20);
        this.name.trim();
    }
}