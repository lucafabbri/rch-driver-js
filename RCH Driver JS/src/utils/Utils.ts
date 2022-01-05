import { ComConst } from "..";

export class Utils {
	static toRtFormat(serialNumber: string): string {
		if (serialNumber.startsWith('72')) {
			return serialNumber;
		} else {
			return (
				'72M' +
				serialNumber.substring(0, 2) +
				serialNumber.substring(4)
			).replace(' ', '');
		}
	}

	static calculateBcc(items: number[]): string {
		var result: number = 0;
		items.forEach((n) => {
			if (n != ComConst.CHR_ETX) {
				if (n == ComConst.CHR_STX) {
					result = ComConst.CHR_STX;
				} else {
					result = result ^ n;
				}
			}
		});
		return result.toString(16).padStart(2, '0').toUpperCase();
	}

	static calculateBccFromString(item: string): string {
		return Utils.calculateBcc([...item].map((c) => c.charCodeAt(0)));
	}
}