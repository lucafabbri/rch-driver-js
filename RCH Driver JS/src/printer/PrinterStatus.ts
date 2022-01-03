export class PrinterStatus {
	error: boolean = false;
	paperOver: boolean = false;
	coverOpen: boolean = false;
	cutterOk: boolean = false;

	constructor(dump: string) {
		this.error = dump.charAt(0) == '1';
		this.paperOver = dump.charAt(1) == '1';
		this.coverOpen = dump.charAt(4) == '1';
		this.cutterOk = dump.charAt(5) == '0';
	}
}