import { IAbstractDevice } from "./IAbstractDevice";
import { IProg } from "./interfaces/prog";

export interface IEcrDevice extends IAbstractDevice {
	fwVersion: string;
	fwVersionLabel: string;
	hasProgDump: boolean;
	nDepartments: number;
	nOperators: number;
	nPayments: number;
	nVats: number;
	prog: IProg | null;
	hasDgfeFreeSpace: boolean;
}