export class RTStatus {
	registered: boolean = false;
	active: boolean = false;
	rt: boolean = false;
	operating: boolean = false;
	revocation: boolean = false;
	decommissioned: boolean = false;

	constructor(dump: string) {
		this.registered = dump.charAt(0) == '1';
		this.active = dump.charAt(1) == '1';
		this.rt = dump.charAt(2) == '1';
		this.operating = dump.charAt(3) == '0';
		this.revocation = dump.charAt(4) == '1';
		this.decommissioned = dump.charAt(5) == '1';
	}
}