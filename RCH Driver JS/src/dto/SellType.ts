
/**
 * The SellType of a BillItem
 * @date 1/11/2022 - 10:52:47 AM
 *
 * @export
 * @enum {number}
 * @see LineItemDTO
 */
export enum SellType{
  
  /**
   * Default Bill Item
   * @date 1/11/2022 - 10:53:18 AM
   */
  NORMAL = 0,
  
  /**
   * This is a free of charge goods or services
   * @date 1/11/2022 - 10:53:31 AM
   */
  FREE = 1,
  
  /**
   * Advance payment only for goods
   * @date 1/11/2022 - 10:54:20 AM
   */
  ADVANCE_PAYMENT = 2,
  
  /**
   * This is a coupon for goods or services
   * @date 1/11/2022 - 10:54:58 AM
   */
  COUPON_SINGLE_USE = 3
}