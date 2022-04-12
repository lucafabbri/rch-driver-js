import { ISlidingMsg } from "../interfaces/ISlidingMsg"

/**
 * @inheritdoc
 *
 * @export
 * @class SlidingMsg
 * @typedef {SlidingMsg}
 * @implements {ISlidingMsg}
 */
export class SlidingMsg implements ISlidingMsg {
	/**
	 * @inheritdoc
	 */
	name: string = '';

	/**
	 * @inheritdoc
	 */
	value: number = 0;
}