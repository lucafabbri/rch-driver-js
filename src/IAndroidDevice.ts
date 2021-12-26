import { IAbstractDevice } from "./IAbstractDevice";

export interface IAndroidDevice extends IAbstractDevice {
    androidId: string;
    swVersionLabel: string;
    swVersion: string;
    licenses: string[];
}