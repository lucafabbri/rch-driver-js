import  { AbstractDevice } from "./AbstractDevice";
import { IProg } from "./interfaces/prog";

export interface EcrDevice extends AbstractDevice {
    hasProgDump: boolean;
    nDepartments: number;
    nVats: number;
    nPayments: number;
    nOperators: number;
    fwVersionLabel: string;
    fwVersion: string;
    prog: IProg;
    hasDgfeFreeSpace: boolean;
}