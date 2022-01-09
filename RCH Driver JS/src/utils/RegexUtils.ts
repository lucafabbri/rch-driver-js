export class RegexUtils {
	static fiscalReportPattern = /^(?<raw> +?DOCUMENTO (?<type>GESTIONALE) +?\n(.*\n)*?VENDITE +?(?<sells>[\d\.,]+?)\nGRAN TOTALE +?(?<grandTotal>[\d\.,]+?)\n(?<vats>IVA(.*\n)*?)?(>?TOT\.DOC\.ANNULLATI +?(?<cancelledDocumentsTotal>[\d\.,]+?)\n)?(?<discounts>SCONTI(.*\n)*?)?(?<payments>(PAGATO.*?\n)*?)?FATTURE +?(?<invoices>[\d]+)\nTOT\. FATTURE +?(?<invoicesTotal>[\d\.,]+?)\n-+?\nCHIUSURA GIORNALIERA N\. +?(?<closureN>[\d]{4})\nDOCUMENTI COMMERCIALI +?(?<fiscalDocuments>[\d]{4})\nDOCUMENTI GESTIONALI +?(?<managementDocuments>[\d]{4})\nLETTURE M\.P\.RIEPILOGO +?(?<summaryReadings>[\d]{4})\n-+?\n +?(?<datetime>[\d]{2}-[\d]{2}-[\d]{4} [\d]{2}:[\d]{2}) +?\n +?DOC\.GESTIONALE N\. (?<closure>[\d]{4})-(?<number>[\d]{4}) +?\nRIPRISTINI +?(?<restores>[\d]{4})\nDGFE:(?<dgfeNumber>[\d]{2}) SIGILLO FISCALE:(?<fiscalSeal>[0-9A-F]+) +?\n +?(?<serialNumber>[7][2][a-zA-Z]{2}[\d]{7}).*?)$/gm;

	static fiscalReportVatDetailsPattern = /^IVA [\d]{1,2} +?([\d\.,]+?%|.{2}) : +?\n TOTALE VENDITE +?(?<sellsGrandTotal>[\d\.,]+?)\n IMPONIBILE VENDITE +?(?<sellsNetTotal>[\d\.,]+?)\n IVA VENDITE +?(?<sellsVatTotal>[\d\.,]+?)\n.*?\nTOTALE IVA (?<id>[\d]{1,2}) +?(?<vat>[\d\.,]+?%|[\w]{2}) +?(?<total>[\d\.,]+?)\n/gm;

	static fiscalReportPaymentDetailsPattern = /^(?<description>[\w \-\+\*\.0-9]+?) +? (?<value>[\d\.,]+?)\n/gm;

	static fiscalReportDiscountDetailsPattern = /^SCONTI (?<isPerc>%)? *? (?<value>[\d\.,]+?)\n/gm;

	static fiscalDocumentPattern = /^(?<raw> +?DOCUMENTO (?<type>COMMERCIALE) +?\n(.*\n)*?(?<items>DESCRIZIONE.*?\n(.*\n)*?)(TOTALE COMPLESSIVO +?(?<grandTotal>[\d\.,]+?)\n)(di cui IVA +?(?<vatTotal>[\d\.,]+?)\n)?(.*\n)*?(\-+?\n(?<payments>(.*?\n)*?)\-+?\n(?<paymentsType>(.*?\n)*?))(Importo pagato[ ]+?(?<paymentTotal>[\d\.,]+?)\n).*?(?<datetime>[\d]{2}-[\d]{2}-[\d]{4} [\d]{2}:[\d]{2}) +?\n +?DOCUMENTO N\. (?<closure>[\d]{4})-(?<number>[\d]{4}) +?\n.*?(?<serialNumber>[7][2][a-zA-Z]{2}[\d]{7}).*?)$/gm;

	static fiscalDocumentItemsPattern = /^((?<description>[\w \-\+\*\.0-9]+?) +?(?<vat>[\d\.,]+?%|[\w]{2}) +?(?<value>[\d\.,]+?)\n)( +?n\.(?<qty>[\d]{1,5}) \* (?<unitValue>[\d\.,]+?) +?\n)?((?<discountDescription>[\w \-\+\*\.0-9]+?)( (?<discountPerc>[\d]{1,3})%)? +?(?<discountVat>[\d\.,]+?%|[\w]{2}) +?(?<discountValue>\-[\d\.,]+?\n))?/gm;

	static fiscalDocumentPaymentsPattern = /^(?<description>[\w \-\+\*\.0-9]+?) +?(?<value>[\d\.,]+?)$/gm;
}