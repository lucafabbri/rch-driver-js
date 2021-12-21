
export class AbstractParser {
    private readonly vatIndexes: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde";

    parseIntWithDecimal(value: string): number {
        return parseInt(value.substring(0, 10));
    } 

    indexChartToInt(c: number): number {
        return this.vatIndexes.indexOf(String.fromCharCode(c));
    }

    indexIntToChar(i:number): string{
        return this.vatIndexes.charAt(i);
    }
}
