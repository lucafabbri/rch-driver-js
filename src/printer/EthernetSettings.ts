
/**
 * Ethernet Settings
 * @date 1/11/2022 - 12:32:43 PM
 *
 * @export
 * @class EthernetSettings
 * @typedef {EthernetSettings}
 */
export class EthernetSettings {
	
	/**
	 * IP
	 * @date 1/11/2022 - 12:32:51 PM
	 *
	 * @type {string}
	 */
	ip: string = '';
	
	/**
	 * Subnet Mask 
	 * @date 1/11/2022 - 12:32:57 PM
	 *
	 * @type {string}
	 */
	subnet: string = '';
	
	/**
	 * Gateway IP
	 * @date 1/11/2022 - 12:33:24 PM
	 *
	 * @type {string}
	 */
	gateway: string = '';
	
	/**
	 * DNS IP
	 * @date 1/11/2022 - 12:33:31 PM
	 *
	 * @type {string}
	 */
	dns: string = '';
	
	/**
	 * IP Port
	 * @date 1/11/2022 - 12:33:37 PM
	 *
	 * @type {number}
	 */
	port: number = 23;
	
	/**
	 * MAC Address
	 * @date 1/11/2022 - 12:33:48 PM
	 *
	 * @type {string}
	 */
	mac: string = '';
    
	/**
	 * Creates an instance of EthernetSettings.
	 * @date 1/11/2022 - 12:33:56 PM
	 *
	 * @constructor
	 * @param {string} data
	 */
	constructor(data: string) {
		const regex = /^IP (?<ip>(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)),SN (?<subnet>(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)),GW (?<gateway>(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)),DNS (?<dns>(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)),PORT (?<port>[0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]),MAC (?<mac>([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))$/;
		var match = regex.exec(data);
		if (match) {
			var groups = match?.groups;
			if (groups) {
				this.ip = groups['ip'];
				this.subnet = groups['subnet'];
				this.gateway = groups['gateway'];
				this.dns = groups['dns'];
				this.port = parseInt(groups['port']);
				this.mac = groups['mac'];
			}
		}
	}
}