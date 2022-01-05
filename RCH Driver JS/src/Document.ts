export class Document {
	raw: string = '';
	get rows(): Array<string> {
		return this.raw.split('\n');
	}
	number: number = 0;
	closure: number = 0;
	date: string | undefined;
	serialNumber: string | undefined;
}