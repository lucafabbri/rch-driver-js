import { AbstractDevice } from "./AbstractDevice";

export interface AndroidDevice extends AbstractDevice {
    androidId: string;
    swVersionLabel: string;
    swVersion: string;
    licenses: string[];
}