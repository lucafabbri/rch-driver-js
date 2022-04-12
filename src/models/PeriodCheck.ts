import { IPeriodCheck } from "../interfaces/IPeriodCheck"

/**
 * @inheritdoc
 *
 * @export
 * @class PeriodCheck
 * @typedef {PeriodCheck}
 * @implements {IPeriodCheck}
 */
export class PeriodCheck implements IPeriodCheck {
	/**
	 * @inheritdoc
	 */
	enabled: boolean = false;

	/**
	 * @inheritdoc
	 */
	value: number = 0;
}