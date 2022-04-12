import { ConnectionConst } from ".";
import { DeviceType } from "./DeviceType";
import { IAbstractDevice } from "./IAbstractDevice";

/**
 * @inheritdoc
 * @date 1/11/2022 - 3:13:37 PM
 *
 * @export
 * @abstract
 * @class AbstractDevice
 * @typedef {AbstractDevice}
 * @implements {IAbstractDevice}
 */
export abstract class AbstractDevice implements IAbstractDevice {
	/**
	 * @inheritdoc
	 */
	serialNumber: string = '';

	/**
	 * @inheritdoc
	 */
	partNumber: string = '';

	/**
	 * @inheritdoc
	 */
	type: DeviceType = DeviceType.PRINTF;

	/**
	 * @inheritdoc
	 */
	connection!: ConnectionConst;

	/**
	 * @inheritdoc
	 */
	ip: string = '';

	/**
	 * @inheritdoc
	 */
	ipPort: number = 23;

	/**
	 * @inheritdoc
	 */
	comPort: string = '';

	/**
	 * @inheritdoc
	 */
	baudRate: number = 9600;

	/**
	 * @inheritdoc
	 */
	hostName: string = '';

	/**
	 * @inheritdoc
	 */
	macAddress: string = '';

	/**
	 * @inheritdoc
	 */
	active: boolean = true;
}