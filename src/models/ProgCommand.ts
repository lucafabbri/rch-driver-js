
/**
 * Programming command
 * @date 1/11/2022 - 12:17:28 PM
 *
 * @export
 * @class ProgCommand
 * @typedef {ProgCommand}
 */
export class ProgCommand {
	
	/**
	 * The description of the command
	 * @date 1/11/2022 - 12:17:45 PM
	 *
	 * @type {(string | undefined)}
	 */
	description: string | undefined;
	
	/**
	 * A valid command
	 * @date 1/11/2022 - 12:17:57 PM
	 *
	 * @type {?string}
	 */
	cmd?: string;
	
	/**
	 * The error if any when created the command
	 * @date 1/11/2022 - 12:18:04 PM
	 *
	 * @type {?string}
	 */
	error?: string;
}