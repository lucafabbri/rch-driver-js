export class EthernetSettings {
	ip: string = '';
	subnet: string = '';
	gateway: string = '';
	dns: string = '';
	port: number = 23;
    mac: string = '';
    
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