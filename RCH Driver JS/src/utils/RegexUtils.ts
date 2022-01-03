export class RegexUtils {
    static matchRtDate(row: string): string | null {
        var regex = /[0-9]{2}-[0-9]{2}-[0-9]{4}[ ][0-9]{2}:[0-9]{2}/;
        return regex.exec(row)?.at(0) ?? null;
    }

    static matchRtDocumentNumber(row: string): number[] | null {
        var result: number[] | null = null;
        var isGestionale = this.matchRtDocumentGestionale(row);

        if (isGestionale) {
            var m = row.match(new RegExp("DOC.GESTIONALE N. [0-9]{4}-[0-9]{4}"));
            var matches = m?.length
            if (matches && matches > 0) {
                var match = m?.at(0)?.replace("DOC.GESTIONALE N. ", "").split('-');
                if (match) {
                    result = [];
                    result.push(parseInt(match[0]));
                    result.push(parseInt(match[1]));
                }
            }
        } else {
            var m = row.match(new RegExp("DOCUMENTO N.  [0-9]{4}-[0-9]{4}"));
            var matches = m?.length
            if (matches && matches > 0) {
                var match = m?.at(0)?.replace("DOCUMENTO N.  ", "").split('-');
                if (match) {
                    result = [];
                    result.push(parseInt(match[0]));
                    result.push(parseInt(match[1]));
                }
            }
        }
        return result;
    }

    static matchRtDocumentGestionale(row: string): boolean {
        var m = new RegExp("DOC.GESTIONALE N. ");
        var matches = row.match(m)?.length
        return (matches != undefined && matches > 0);
    }

    static matchRtSerialNumber(row: string): boolean {
        var m = new RegExp("[7][2][a-zA-Z][a-zA-Z][0-9]{7}");
        var matches = row.match(m)?.length
        return (matches != undefined && matches > 0);
    }
}