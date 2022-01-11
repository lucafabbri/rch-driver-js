import  { AbstractDevice } from "./AbstractDevice";
import { IEcrDevice } from "./IEcrDevice";
import { IProg } from "./interfaces/IProg";

/**
 * ECR Devoce
 * @inheritdoc
 *
 * @export
 * @class EcrDevice
 * @typedef {EcrDevice}
 * @extends {AbstractDevice}
 * @implements {IEcrDevice}
 */
export class EcrDevice extends AbstractDevice implements IEcrDevice {
	/**
	 * @inheritdoc
	 */
	fwVersion: string = '';

	/**
	 * @inheritdoc
	 */
	fwVersionLabel: string = '';

	/**
	 * @inheritdoc
	 */
	hasProgDump: boolean = false;

	/**
	 * @inheritdoc
	 */
	nDepartments: number = 0;

	/**
	 * @inheritdoc
	 */
	nOperators: number = 0;

	/**
	 * @inheritdoc
	 */
	nPayments: number = 0;

	/**
	 * @inheritdoc
	 */
	nVats: number = 0;

	/**
	 * @inheritdoc
	 */
	prog: IProg | null = null;

	/**
	 * @inheritdoc
	 */
	hasDgfeFreeSpace: boolean = false;
}