import { ICourtesyLine } from "../interfaces/ICourtesyLine"
import { IDepartment } from "../interfaces/IDepartment"
import { IGroup } from "../interfaces/IGroup"
import { IHeadingRow } from "../interfaces/IHeadingRow"
import { IInvoiceText } from "../interfaces/IInvoiceText"
import { ILogo } from "../interfaces/ILogo"
import { IOperator } from "../interfaces/IOperator"
import { IPayment } from "../interfaces/IPayment"
import { IPeriodCheck } from "../interfaces/IPeriodCheck"
import { IProg } from "../interfaces/IProg"
import { ISlidingMsg } from "../interfaces/ISlidingMsg"
import { IVat } from "../interfaces/IVat"
import { IXMLSendSchedule } from "../interfaces/IXMLSendSchedule"
import { AbstractParser } from "./AbstractParser";
import { CourtesyLine } from "./CourtesyLine"
import { Department } from "./Department"
import { Group } from "./Group"
import { HeadingRow } from "./HeadingRow"
import { InvoiceText } from "./InvoiceText"
import { Operator } from "./Operator"
import { Payment } from "./Payment"
import { Vat } from "./Vat"
import { XMLSendSchedule } from "./XMLSendSchedule"

/**
 * @inheritdoc
 *
 * @export
 * @class Prog
 * @typedef {Prog}
 * @extends {AbstractParser}
 * @implements {IProg}
 */
export class Prog extends AbstractParser implements IProg {
	/**
	 * @inheritdoc
	 */
	statDepartment: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statVat: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statHour: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statClerk: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statFinancial: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statGrpDetail: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	statGrpTot: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	logo: ILogo[] = [];

	/**
	 * @inheritdoc
	 */
	courtesyLine: ICourtesyLine[] = [];

	/**
	 * @inheritdoc
	 */
	slidingMsg: ISlidingMsg | null = null;

	/**
	 * @inheritdoc
	 */
	percDiscount: number = 0;

	/**
	 * @inheritdoc
	 */
	percAddon: number = 0;

	/**
	 * @inheritdoc
	 */
	drawerPulse: number = 0;

	/**
	 * @inheritdoc
	 */
	eCRNum: number = 0;

	/**
	 * @inheritdoc
	 */
	intInvoice: boolean = false;

	/**
	 * @inheritdoc
	 */
	invoice2Lines: boolean = false;

	/**
	 * @inheritdoc
	 */
	invoiceSubtotal: boolean = false;

	/**
	 * @inheritdoc
	 */
	invoiceClientCheck: boolean = false;

	/**
	 * @inheritdoc
	 */
	fidelity: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	pcsOperatorPrint: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	kbdPrebill: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	periodCheck: IPeriodCheck | null = null;

	/**
	 * @inheritdoc
	 */
	printECRNum: boolean = false;

	/**
	 * @inheritdoc
	 */
	singleQuantity: boolean = false;

	/**
	 * @inheritdoc
	 */
	printUnitPrice: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	showChange: boolean = false;

	/**
	 * @inheritdoc
	 */
	mandSubtotal: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	cutter: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	midnightAlert: boolean = false;

	/**
	 * @inheritdoc
	 */
	creditNote: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	creditNoteProgressive: number = 0;

	/**
	 * @inheritdoc
	 */
	cashDeclaration: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	printBuffer: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	departmentNet: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	appendixCut: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	vatVentilation: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	printLastReceiptFromDGFE: boolean | null = null;

	/**
	 * @inheritdoc
	 */
	invoiceProgressive: number = 0;

	/**
	 * @inheritdoc
	 */
	receiptLimit: number = 0;

	/**
	 * @inheritdoc
	 */
	xMLSendSchedule: IXMLSendSchedule | null = null;

	/**
	 * @inheritdoc
	 */
	invoiceText: IInvoiceText[] = [];

	/**
	 * @inheritdoc
	 */
	departments: IDepartment[] = [];

	/**
	 * @inheritdoc
	 */
	vats: IVat[] = [];

	/**
	 * @inheritdoc
	 */
	operators: IOperator[] = [];

	/**
	 * @inheritdoc
	 */
	payments: IPayment[] = [];

	/**
	 * @inheritdoc
	 */
	groups: IGroup[] = [];

	/**
	 * @inheritdoc
	 */
	courtesyLines: ICourtesyLine[] = [];

	/**
	 * @inheritdoc
	 */
	headings: IHeadingRow[] = [];

	/**
	 * Creates an instance of Prog.
	 * @date 1/11/2022 - 12:17:05 PM
	 *
	 * @constructor
	 * @public
	 */
	public constructor();

	/**
	 * Creates an instance of Prog.
	 * @date 1/11/2022 - 12:17:09 PM
	 *
	 * @constructor
	 * @public
	 * @param {Array<string>} entries
	 */
	public constructor(entries: Array<string>);

	/**
	 * Creates an instance of Prog.
	 * @date 1/11/2022 - 12:17:15 PM
	 *
	 * @constructor
	 * @param {...any[]} entries
	 */
	constructor(...entries: any[]) {
		super();
		this.departments = [];
		this.vats = [];
		this.operators = [];
		this.payments = [];
		this.groups = [];
		this.headings = [];
		for (var i = 1; i <= 13; i++) {
			this.headings.push({id: i} as IHeadingRow);
		}
		this.courtesyLines.push({id: 1, name: 'linea di cortesia 1'});
		this.courtesyLines.push({id: 2, name: 'linea di cortesia 2'});
		this.slidingMsg = {name: 'Messaggio scorrevole', value: 1};
		this.statDepartment = false;
		this.statClerk = false;
		this.statFinancial = false;
		this.statGrpDetail = false;
		this.statGrpTot = false;
		this.statHour = false;
		this.statVat = false;
		this.printUnitPrice = true;
		this.mandSubtotal = false;
		this.cutter = false;
		this.creditNote = false;
		this.cashDeclaration = false;
		this.printBuffer = true;
		this.departmentNet = false;
		this.appendixCut = true;
		this.vatVentilation = false;
		this.printLastReceiptFromDGFE = true;
		this.drawerPulse = 2;
		this.eCRNum = 1;
		this.xMLSendSchedule = {
			enabled: true,
			endHour: 30,
			hours: 40,
			minutes: 50,
			startHour: 50,
			standBy: 10,
		};

		if (entries.length == 1) {
			var rows = entries[0] as string[];
			for (var i = 0; i < rows.length; i++) {
				var entry = rows[i];
				try {
					switch (entry.charAt(0)) {
						case 'R':
							this.departments.push(new Department(entry, rows[i + 1]));
							i++;
							break;
						case 't':
							if (!this.courtesyLine) {
								this.courtesyLine = [];
							}
							this.courtesyLine.push(new CourtesyLine(entry, rows[i + 1]));
							i++;
							break;
						case 'H':
							var row = new HeadingRow(entry, rows[i + 1]);
							try {
								let heading = this.headings?.find((h) => h.id == row.id);
								if (heading) {
									heading.name = row.name;
								}
							} catch {
								//silent is golden
							}
							i++;
							break;
						case 'V':
							this.vats.push(new Vat(entry));
							break;
						case 'T':
							this.payments.push(new Payment(entry));
							break;
						case 'O':
							this.operators.push(new Operator(entry));
							break;
						case 'C':
							switch (entry.substring(0, 4)) {
								case 'C117':
									this.statClerk = entry.charAt(4) == '1';
									this.statDepartment = entry.charAt(5) == '1';
									this.statFinancial = entry.charAt(6) == '1';
									this.statHour = entry.charAt(7) == '1';
									this.statVat = entry.charAt(8) == '1';
									this.statGrpDetail = entry.charAt(10) == '1';
									this.statGrpTot = entry.charAt(11) == '1';
									break;
								case 'C118':
									break;
								case 'C119':
									break;
								case 'C120':
									break;
								case 'C121':
									break;
								case 'C122':
									this.drawerPulse = this.indexChartToInt(entry.charCodeAt(4));
									break;
								case 'C125':
									break;
								case 'C126':
									this.midnightAlert = entry.charAt(4) == '1';
									break;
								case 'C130':
									this.invoiceProgressive = parseInt(entry.substring(15, 20));
									break;
								case 'C132':
									this.printECRNum = entry.charAt(4) == '1';
									this.eCRNum = parseInt(entry.substring(5, 8));
									break;
								case 'C133':
									this.invoiceSubtotal = entry.charAt(4) == '1';
									break;
								case 'C135':
									this.receiptLimit = this.parseIntWithDecimal(
										entry.substring(10, 20)
									);
									break;
								case 'C136':
									this.showChange = entry.charAt(4) == '1';
									break;
								case 'C137':
									if (!this.groups) {
										this.groups = [];
									}
									this.groups.push(new Group(entry));
									break;
								case 'C138':
									this.departmentNet = entry.charAt(4) == '1';
									break;
								case 'C139':
									this.creditNoteProgressive = parseInt(
										entry.substring(10, 20)
									);
									break;
								case 'C159':
									this.creditNote = entry.charAt(4) == '1';
									break;
								case 'C170':
									this.appendixCut = entry.charAt(4) == '1';
									break;
								case 'C808':
									this.xMLSendSchedule = new XMLSendSchedule(entry);
									break;
								case 'C822':
									this.vatVentilation = entry.charAt(4) == '1';
									break;
								case 'C912':
									break;
								case 'C917':
									this.invoice2Lines = entry.charAt(5) == '1';
									this.intInvoice = entry.charAt(6) == '1';
									this.invoiceSubtotal = entry.charAt(8) == '1';
									this.invoiceClientCheck = entry.charAt(10) == '1';
									break;
								case 'C918':
									if (!this.invoiceText) {
										this.invoiceText = [];
									}
									this.invoiceText.push(new InvoiceText(entry, rows[i + 1]));
									i++;
									break;
								case 'C927':
									this.singleQuantity = entry.charAt(4) == '1';
									this.printUnitPrice = entry.charAt(5) == '1';
									break;
								case 'C928':
									break;
								case 'C932':
									this.printBuffer = entry.charAt(4) == '1';
									break;
								case 'C933':
									this.fidelity = entry.charAt(4) == '1';
									break;
								case 'C934':
									break;
								case 'C935':
									this.printLastReceiptFromDGFE = entry.charAt(4) == '1';
									break;
								case 'C980':
									this.cashDeclaration = entry.charAt(4) == '1';
									break;
								case 'C988':
									this.pcsOperatorPrint = entry.charAt(4) == '1';
									break;
								case 'C996':
									break;
								case 'C997':
									this.cutter = entry.charAt(4) == '1';
									break;
							}
							break;
					}
				} catch {
					//silent is golden
				}
			}
		}
	}
}