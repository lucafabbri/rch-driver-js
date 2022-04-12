import { Receipt } from "..";

/**
 * This is the result afater a Bill is printed
 * @date 1/11/2022 - 10:32:27 AM
 *
 * @export
 * @class PrintBillResponseDTO
 * @typedef {PrintBillResponseDTO}
 */
export class PrintBillResponseDTO {
  
  /**
   * The document as saved in the DGFE
   * @date 1/11/2022 - 10:33:03 AM
   *
   * @type {Receipt}
   */
  receipt?: Receipt;
}