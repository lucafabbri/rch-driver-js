export class RegexUtils {
    public static matchRtDate(row: string): string | null {
        var m = new RegExp("[0-9]{2}-[0-9]{2}-[0-9]{4}[ ][0-9]{2}:[0-9]{2}");
        return row.match(m)?.at(0) ?? null;
    }

    public static matchRtDocumentNumber(row: string): number[] {
        int[] result = null;
        var isGestionale = MatchRtDocumentGestionale(row);
        if (isGestionale) {
            Match m = Regex.Match(row, @"DOC.GESTIONALE N. [0-9]{4}-[0-9]{4}");
            if (m.Success) {
                string[] match = m.Value.Replace("DOC.GESTIONALE N. ", "").Split('-');
                result = new int[2];
                result[0] = int.Parse(match[0]);
                result[1] = int.Parse(match[1]);
            }
        }
        else {
            Match m = Regex.Match(row, @"DOCUMENTO N.  [0-9]{4}-[0-9]{4}");
            if (m.Success) {
                string[] match = m.Value.Replace("DOCUMENTO N. ", "").Split('-');
                result = new int[2];
                result[0] = int.Parse(match[0]);
                result[1] = int.Parse(match[1]);
            }
        }
        return result;
    }

    public static matchRtDocumentGestionale(row: string): boolean {
        var m = new RegExp("DOC.GESTIONALE N. ");
        var matches = row.match(m)?.length
        return (matches != undefined && matches > 0);
    }

    public static matchRtSerialNumber(row: string): boolean {
        var m = new RegExp("[7][2][a-zA-Z][a-zA-Z][0-9]{7}");
        var matches = row.match(m)?.length
        return (matches != undefined && matches > 0);
    }
}