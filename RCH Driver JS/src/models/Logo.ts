import { ILogo } from "../interfaces/ILogo"

/**
 * @inheritdoc
 *
 * @export
 * @class Logo
 * @typedef {Logo}
 * @implements {ILogo}
 */
export class Logo implements ILogo {
	/**
	 * @inheritdoc
	 */
	id: number = 0;

	/**
	 * @inheritdoc
	 */
	value: number = 0;
}