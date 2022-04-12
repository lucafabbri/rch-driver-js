import { AbstractDevice } from "./AbstractDevice";
import { IAndroidDevice } from "./IAndroidDevice";

/**
 * Definition of an Android Device
 * @date 1/11/2022 - 3:17:07 PM
 *
 * @inheritdoc
 * 
 * @export
 * @class AndroidDevice
 * @typedef {AndroidDevice}
 * @extends {AbstractDevice}
 * @implements {IAndroidDevice}
 */
export class AndroidDevice extends AbstractDevice implements IAndroidDevice {
    
    /**
     * Android Id
     * @date 1/11/2022 - 3:17:20 PM
     *
     * @type {string}
     */
    androidId: string = "";
    
    /**
     * AST Software version label
     * @date 1/11/2022 - 3:17:30 PM
     *
     * @type {string}
     */
    swVersionLabel: string = "";
    
    /**
     * ATS sotware version
     * @date 1/11/2022 - 3:17:43 PM
     *
     * @type {string}
     */
    swVersion: string = "";
    
    /**
     * Installed licenses codes
     * @date 1/11/2022 - 3:17:51 PM
     *
     * @type {string[]}
     */
    licenses: string[] = [];
}