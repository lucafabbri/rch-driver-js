
/**
 * Regex Utils for parsing DGFE Dump
 * @date 1/11/2022 - 2:53:02 PM
 *
 * @export
 * @class RegexUtils
 * @typedef {RegexUtils}
 */
export class RegexUtils {
	/**
	 * Matches a fiscal report document.
	 *
	 * Available groups:
	 * raw => the whole match
	 * type => the type of document (GESTIONALE)
	 * sells => number of sells
	 * grandTotal => printer grand total in currency, it includes dots (thousands) and commas (decimals)
	 * vats => portion of document containing Vats details
	 * cancelledDocumentsTotal => the total number of cancelled documents
	 * discounts => portion of document containing Discounts details
	 * payments => portion of document containing Payments details
	 * invoices => number of Invoices
	 * invoicesTotal => total amount of Invoices
	 * closureN => closure number
	 * fiscalDocuments => number of Fiscal Documents (DOCUMENTI COMMERCIALI)
	 * managementDocuments => number of Management Documents (DOCUMENTI GESTIONALI)
	 * summaryReadings => number of readings of the summaries
	 * datetime => the datetime of document format: dd-MM-yyyy HH:mm
	 * closure => closure number
	 * number => document number
	 * restores => number of restores till now
	 * dgfeNumber => the incremental number of the DGFE installed since initialization of the printer
	 * fiscalSeal => the seal of the closure document
	 * serialNumber => Device serial number
	 * @date 1/11/2022 - 2:53:26 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalReportPattern = /^(?<raw> +?DOCUMENTO (?<type>GESTIONALE) +?\n(.*\n)*?VENDITE +?(?<sells>[\d\.,]+?)\nGRAN TOTALE +?(?<grandTotal>[\d\.,]+?)\n(?<vats>IVA(.*\n)*?)?(>?TOT\.DOC\.ANNULLATI +?(?<cancelledDocumentsTotal>[\d\.,]+?)\n)?(?<discounts>SCONTI(.*\n)*?)?(?<payments>(PAGATO.*?\n)*?)?FATTURE +?(?<invoices>[\d]+)\nTOT\. FATTURE +?(?<invoicesTotal>[\d\.,]+?)\n-+?\nCHIUSURA GIORNALIERA N\. +?(?<closureN>[\d]{4})\nDOCUMENTI COMMERCIALI +?(?<fiscalDocuments>[\d]{4})\nDOCUMENTI GESTIONALI +?(?<managementDocuments>[\d]{4})\nLETTURE M\.P\.RIEPILOGO +?(?<summaryReadings>[\d]{4})\n-+?\n +?(?<datetime>[\d]{2}-[\d]{2}-[\d]{4} [\d]{2}:[\d]{2}) +?\n +?DOC\.GESTIONALE N\. (?<closure>[\d]{4})-(?<number>[\d]{4}) +?\nRIPRISTINI +?(?<restores>[\d]{4})\nDGFE:(?<dgfeNumber>[\d]{2}) SIGILLO FISCALE:(?<fiscalSeal>[0-9A-F]+) +?\n +?(?<serialNumber>[7][2][a-zA-Z]{2}[\d]{7}).*?)$/gm;

	/**
	 * Matches Vat details withing vats group of a fiscal report
	 *
	 * Available groups:
	 * sellsGrandTotal => Total value of sells
	 * sellsNetTotal => Total net value of sells
	 * sellsVatTotal => Total tax value of sells
	 * id => Vat Id
	 * vat => Vat percentage or nature
	 * total => Vat total
	 *
	 * @date 1/11/2022 - 3:00:30 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalReportVatDetailsPattern = /^IVA [\d]{1,2} +?([\d\.,]+?%|.{2}) : +?\n TOTALE VENDITE +?(?<sellsGrandTotal>[\d\.,]+?)\n IMPONIBILE VENDITE +?(?<sellsNetTotal>[\d\.,]+?)\n IVA VENDITE +?(?<sellsVatTotal>[\d\.,]+?)\n.*?\nTOTALE IVA (?<id>[\d]{1,2}) +?(?<vat>[\d\.,]+?%|[\w]{2}) +?(?<total>[\d\.,]+?)\n/gm;

	/**
	 * Matches Payment details withing payments group of a fiscal report
	 *
	 * Available groups:
	 * description => the payment description
	 * value => Total value for that payment
	 * @date 1/11/2022 - 3:02:22 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalReportPaymentDetailsPattern = /^(?<description>[\w \-\+\*\.0-9]+?) +? (?<value>[\d\.,]+?)\n/gm;

	/**
	 * Matches Discount details withing discounts group of a fiscal report
	 *
	 * Available groups:
	 * isPerc => whether the discount is a value o percentage discount
	 * value => Total value for that discount
	 * @date 1/11/2022 - 3:02:40 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalReportDiscountDetailsPattern = /^SCONTI (?<isPerc>%)? *? (?<value>[\d\.,]+?)\n/gm;

	/**
	 * Matches a fiscal document
	 *
	 * Available groups:
	 * raw => the whole match
	 * type => the type of document (COMMERCIALE)
	 * items => portion of match containing the sold items
	 * grandTotal => document grand total in currency, it includes dots (thousands) and commas (decimals)
	 * vatTotal => document vat total in currency, it includes dots (thousands) and commas (decimals)
	 * payments => portion of document containing Payments details
	 * paymentsType => portion of document containing Payment details by type
	 * paymentTotal => document payments total, it includes dots (thousands) and commas (decimals)
	 * datetime => the datetime of document format: dd-MM-yyyy HH:mm
	 * closure => closure number
	 * number => document number
	 * serialNumber => Device serial number
	 * @date 1/11/2022 - 3:03:55 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalDocumentPattern = /^(?<raw> +?DOCUMENTO (?<type>COMMERCIALE) +?\n(.*\n)*?(?<items>DESCRIZIONE.*?\n(.*\n)*?)(TOTALE COMPLESSIVO +?(?<grandTotal>[\d\.,]+?)\n)(di cui IVA +?(?<vatTotal>[\d\.,]+?)\n)?(.*\n)*?(\-+?\n(?<payments>(.*?\n)*?)\-+?\n(?<paymentsType>(.*?\n)*?))(Importo pagato[ ]+?(?<paymentTotal>[\d\.,]+?)\n).*?(?<datetime>[\d]{2}-[\d]{2}-[\d]{4} [\d]{2}:[\d]{2}) +?\n +?DOCUMENTO N\. (?<closure>[\d]{4})-(?<number>[\d]{4}) +?\n.*?(?<serialNumber>[7][2][a-zA-Z]{2}[\d]{7}).*?)$/gm;

	/**
	 * Matches Items details withing items group of a fiscal document
	 *
	 * Available groups:
	 * description => the Description of the Item
	 * vat => the applied Vat, percentage or nature
	 * value => the Total Value of the Item(s) sold, it includes dots (thousands) and commas (decimals)
	 * qty => the Quantity of the Item sold
	 * unitValue => Unit Price, it includes dots (thousands) and commas (decimals)
	 * discountDescription => the Description of the discount
	 * discountPerc => Discount Percentage if available
	 * discountVat => Discount Vat if applicable
	 * discountValue => Disocunt Value if applicable
	 * @date 1/11/2022 - 3:07:01 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalDocumentItemsPattern = /^((?<description>[\w \-\+\*\.0-9]+?) +?(?<vat>[\d\.,]+?%|[\w]{2}) +?(?<value>[\d\.,]+?)\n)( +?n\.(?<qty>[\d]{1,5}) \* (?<unitValue>[\d\.,]+?) +?\n)?((?<discountDescription>[\w \-\+\*\.0-9]+?)( (?<discountPerc>[\d]{1,3})%)? +?(?<discountVat>[\d\.,]+?%|[\w]{2}) +?(?<discountValue>\-[\d\.,]+?\n))?/gm;

	/**
	 * Matches Payments details withing payments group of a fiscal document
	 *
	 * Available groups:
	 * description => Payment description
	 * value => Total Value of Payment, it includes dots (thousands) and commas (decimals)
	 * @date 1/11/2022 - 3:10:22 PM
	 *
	 * @static
	 * @type {{}}
	 */
	static fiscalDocumentPaymentsPattern = /^(?<description>[\w \-\+\*\.0-9]+?) +?(?<value>[\d\.,]+?)$/gm;
}