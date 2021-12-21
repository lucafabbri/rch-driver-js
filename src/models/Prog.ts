import { ICourtesyLine } from "../interfaces/courtesyLine"
import { IDepartment } from "../interfaces/department"
import { IDevice } from "../interfaces/device"
import { IDocument } from "../interfaces/document"
import { IGroup } from "../interfaces/group"
import { IHeadingRow } from "../interfaces/headingRow"
import { IInvoiceText } from "../interfaces/invoiceText"
import { ILogo } from "../interfaces/logo"
import { IOperator } from "../interfaces/operator"
import { IPayment } from "../interfaces/payment"
import { IPeriodCheck } from "../interfaces/periodCheck"
import { ISlidingMsg } from "../interfaces/slidingMsg"
import { IVat } from "../interfaces/vat"
import { IXMLSendSchedule } from "../interfaces/xMLSendSchedule"
import { AbstractParser } from "./AbstractParser";
import { CourtesyLine } from "./courtesyLine"
import { Department } from "./department"
import { Group } from "./Group"
import { HeadingRow } from "./HeadingRow"
import { InvoiceText } from "./InvoiceText"
import { Operator } from "./Operator"
import { Payment } from "./Payment"
import { Vat } from "./Vat"
import { XMLSendSchedule } from "./XMLSendSchedule"
export class Prog extends AbstractParser {
    statDepartment: boolean | null;
    statVat: boolean | null;
    statHour: boolean | null;
    statClerk: boolean | null;
    statFinancial: boolean | null;
    statGrpDetail: boolean | null;
    statGrpTot: boolean | null;
    logo: ILogo[];
    courtesyLine: ICourtesyLine[];
    slidingMsg: ISlidingMsg;
    percDiscount: number;
    percAddon: number;
    drawerPulse: number;
    eCRNum: number;
    intInvoice: boolean | null;
    invoice2Lines: boolean | null;
    invoiceSubtotal: boolean | null;
    invoiceClientCheck: boolean | null;
    fidelity: boolean | null;
    pcsOperatorPrint: boolean | null;
    kbdPrebill: boolean | null;
    periodCheck: IPeriodCheck;
    printECRNum: boolean | null;
    singleQuantity: boolean | null;
    printUnitPrice: boolean | null;
    showChange: boolean | null;
    mandSubtotal: boolean | null;
    cutter: boolean | null;
    midnightAlert: boolean | null;
    creditNote: boolean | null;
    creditNoteProgressive: number;
    cashDeclaration: boolean | null;
    printBuffer: boolean | null;
    departmentNet: boolean | null;
    appendixCut: boolean | null;
    vatVentilation: boolean | null;
    printLastReceiptFromDGFE: boolean | null;
    invoiceProgressive: number;
    receiptLimit: number;
    xMLSendSchedule: IXMLSendSchedule;
    invoiceText: IInvoiceText[];
    departments: IDepartment[];
    vats: IVat[];
    operators: IOperator[];
    payments: IPayment[];
    groups: IGroup[];
    courtesyLines: ICourtesyLine[];
    headings: IHeadingRow[];

    constructor(entries: Array<string>) {
        super();
        this.departments = [];
        this.vats = [];
        this.operators = [];
        this.payments = [];
        this.groups = [];
        this.headings = [];
        for (var i = 1; i <= 13; i++) {
            this.headings.push({ id: i } as IHeadingRow);
        }
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            try {
                switch (entry.charAt(0)) {
                    case 'R':
                        this.departments.push(new Department(entry, entries[i + 1]));
                        i++;
                        break;
                    case 't':
                        if (!this.courtesyLine) {
                            this.courtesyLine = []
                        }
                        this.courtesyLine.push(new CourtesyLine(entry, entries[i + 1]));
                        i++;
                        break;
                    case 'H':
                        var row = new HeadingRow(entry, entries[i + 1]);
                        try {
                            this.headings.find(h => h.id == row.id).name = row.name
                        } catch {
                            //silent is golden
                        }
                        i++;
                        break;
                    case 'V':
                        this.vats.push(new Vat(entry))
                        break;
                    case 'T':
                        this.payments.push(new Payment(entry))
                        break;
                    case 'O':
                        this.operators.push(new Operator(entry))
                        break;
                    case 'C':
                        switch (entry.substring(0, 4)) {
                            case "C117":
                                this.statClerk = entry.charAt(4) == '1';
                                this.statDepartment = entry.charAt(5) == '1';
                                this.statFinancial = entry.charAt(6) == '1';
                                this.statHour = entry.charAt(7) == '1';
                                this.statVat = entry.charAt(8) == '1';
                                this.statGrpDetail = entry.charAt(10) == '1';
                                this.statGrpTot = entry.charAt(11) == '1';
                                break;
                            case "C118":
                                break;
                            case "C119":
                                break;
                            case "C120":
                                break;
                            case "C121":
                                break;
                            case "C122":
                                this.drawerPulse = this.indexChartToInt(entry.charCodeAt(4));
                                break;
                            case "C125":
                                break;
                            case "C126":
                                this.midnightAlert = entry.charAt(4) == '1';
                                break;
                            case "C130":
                                this.invoiceProgressive = parseInt(entry.substring(15, 5));
                                break;
                            case "C132":
                                this.printECRNum = entry.charAt(4) == '1';
                                this.eCRNum = parseInt(entry.substring(5, 3))
                                break;
                            case "C133":
                                this.invoiceSubtotal = entry.charAt(4) == '1';
                                break;
                            case "C135":
                                this.receiptLimit = this.parseIntWithDecimal(entry.substring(10, 10));
                                break;
                            case "C136":
                                this.showChange = entry.charAt(4) == '1';
                                break;
                            case "C137":
                                if (!this.groups) {
                                    this.groups = []
                                }
                                this.groups.push(new Group(entry));
                                break;
                            case "C138":
                                this.departmentNet = entry.charAt(4) == '1';
                                break;
                            case "C139":
                                this.creditNoteProgressive = parseInt(entry.substring(10, 10));
                                break;
                            case "C159":
                                this.creditNote = entry.charAt(4) == '1';
                                break;
                            case "C170":
                                this.appendixCut = entry.charAt(4) == '1';
                                break;
                            case "C808":
                                this.xMLSendSchedule = new XMLSendSchedule(entry);
                                break;
                            case "C822":
                                this.vatVentilation = entry.charAt(4) == '1';
                                break;
                            case "C912":
                                break;
                            case "C917":
                                this.invoice2Lines = entry.charAt(5) == '1';
                                this.intInvoice = entry.charAt(6) == '1';
                                this.invoiceSubtotal = entry.charAt(8) == '1';
                                this.invoiceClientCheck = entry.charAt(10) == '1';
                                break;
                            case "C918":
                                if (!this.invoiceText) {
                                    this.invoiceText = []
                                }
                                this.invoiceText.push(new InvoiceText(entry, entries[i + 1]));
                                i++;
                                break;
                            case "C927":
                                this.singleQuantity = entry.charAt(4) == '1';
                                this.printUnitPrice = entry.charAt(5) == '1';
                                break;
                            case "C928":
                                break;
                            case "C932":
                                this.printBuffer = entry.charAt(4) == '1';
                                break;
                            case "C933":
                                this.fidelity = entry.charAt(4) == '1';
                                break;
                            case "C934":
                                break;
                            case "C935":
                                this.printLastReceiptFromDGFE = entry.charAt(4) == '1';
                                break;
                            case "C980":
                                this.cashDeclaration = entry.charAt(4) == '1';
                                break;
                            case "C988":
                                this.pcsOperatorPrint = entry.charAt(4) == '1';
                                break;
                            case "C996":
                                break;
                            case "C997":
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