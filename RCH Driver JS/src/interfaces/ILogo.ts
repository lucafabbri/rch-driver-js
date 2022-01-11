
/**
 * Logo information
 * @date 1/11/2022 - 11:49:06 AM
 *
 * @export
 * @interface ILogo
 * @typedef {ILogo}
 */
export interface ILogo {
    
    /**
     * Id of the logo between 1-2
     * @date 1/11/2022 - 11:49:19 AM
     *
     * @type {(number | undefined)}
     */
    id: number | undefined;
    
    /**
     * Value of the Logo 0 = OFF, 1-4
     * @date 1/11/2022 - 11:49:26 AM
     *
     * @type {(number | undefined)}
     */
    value: number | undefined;
}
