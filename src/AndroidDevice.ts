import { AbstractDevice } from "./AbstractDevice";
import { IAndroidDevice } from "./IAndroidDevice";

export class AndroidDevice extends AbstractDevice implements IAndroidDevice {
    androidId: string = "";
    swVersionLabel: string = "";
    swVersion: string = "";
    licenses: string[] = [];
}