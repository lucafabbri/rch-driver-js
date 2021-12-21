import { IProg } from "./interfaces/prog";

export interface EcrDevice {
    fwVersion: string;
    fwVersionLabel: string;
    hasProgDump: boolean;
    nDepartments: number;
    nOperators: number;
    nPayments: number;
    nVats: number;
    prog: IProg;
}