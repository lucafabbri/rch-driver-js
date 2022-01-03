import { IGroup } from "../interfaces/group";
export class Group implements IGroup {
    id: number;
    name: string;

    constructor(entry: string) {
        this.id = parseInt(entry.substring(4, 6));
        this.name = entry.substring(10, 30);
        this.name.trim();
    }
}