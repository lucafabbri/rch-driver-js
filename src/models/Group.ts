import { IGroup } from "../interfaces/group";
export class Group implements IGroup {
    id: number;
    name: string;

    constructor(entry: string) {
        this.id = parseInt(entry.substring(4, 2));
        this.name = entry.substring(10, 20);
        this.name.trim();
    }
}