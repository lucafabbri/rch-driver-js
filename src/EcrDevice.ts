import  { AbstractDevice } from "./AbstractDevice";
import { IEcrDevice } from "./IEcrDevice";
import { IProg } from "./interfaces/prog";

export class EcrDevice extends AbstractDevice implements IEcrDevice {
	fwVersion: string = "";
	fwVersionLabel: string = "";
	hasProgDump: boolean = false;
	nDepartments: number = 0;
	nOperators: number = 0;
	nPayments: number = 0;
	nVats: number = 0;
	prog: IProg | null = null;
	hasDgfeFreeSpace: boolean = false;
}