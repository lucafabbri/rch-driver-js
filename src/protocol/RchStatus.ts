
/**
 * Status of a protocol request/response
 * @date 1/11/2022 - 2:11:18 PM
 *
 * @export
 * @enum {number}
 */
export enum RchStatus{
	PENDING,
	DISCONNECTED,
	OK,
	PRINTER_BUSY,
	PRINTER_BLOCKED,
	PRINTER_PAPER_OVER,
	PRINTER_COVER_OPEN
}