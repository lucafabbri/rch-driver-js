import { IProg } from "../interfaces/prog";

export interface DeviceCapabilites {
    type: string;
    fwVersion: string;
    hasProgDump: boolean;
    hasDgfeFreeSpace: boolean;
    nDepartments: number;
    nVats: number;
    nPayments: number;
    nOperators: number;
    isDefault: boolean;
    defaultProg: IProg | null | undefined;
}