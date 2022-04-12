import { IGroup } from "../interfaces/IGroup";

/**
 * @inheritdoc
 *
 * @export
 * @class Group
 * @typedef {Group}
 * @implements {IGroup}
 */
export class Group implements IGroup {
	/**
	 * @inheritdoc
	 */
	id: number;

	/**
	 * @inheritdoc
	 */
	name: string;

	/**
     * Creates an instance of Group.
     * @date 1/11/2022 - 12:13:16 PM
     *
     * @constructor
     * @param {string} entry
     */
    constructor(entry: string) {
		this.id = parseInt(entry.substring(4, 6));
		this.name = entry.substring(10, 30);
		this.name.trim();
	}
}