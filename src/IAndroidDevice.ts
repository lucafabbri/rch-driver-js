import { IAbstractDevice } from "./IAbstractDevice";

/**
 * Android device
 * @inheritdoc
 *
 * @export
 * @interface IAndroidDevice
 * @typedef {IAndroidDevice}
 * @extends {IAbstractDevice}
 */
export interface IAndroidDevice extends IAbstractDevice {
    
    /**
     * Android id
     * @date 1/11/2022 - 4:03:46 PM
     *
     * @type {string}
     */
    androidId: string;
    
    /**
     * Software version label
     * @date 1/11/2022 - 4:03:52 PM
     *
     * @type {string}
     */
    swVersionLabel: string;
    
    /**
     * Software version
     * @date 1/11/2022 - 4:04:07 PM
     *
     * @type {string}
     */
    swVersion: string;
    
    /**
     * Installed licenses
     * @date 1/11/2022 - 4:04:17 PM
     *
     * @type {string[]}
     */
    licenses: string[];
}