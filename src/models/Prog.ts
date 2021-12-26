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
import { IProg } from "../interfaces/prog"
import { ISlidingMsg } from "../interfaces/slidingMsg"
import { IVat } from "../interfaces/vat"
import { IXMLSendSchedule } from "../interfaces/xMLSendSchedule"
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
export class Prog extends AbstractParser implements IProg {
    statDepartment: boolean | null = null;
    statVat: boolean | null = null;
    statHour: boolean | null = null;
    statClerk: boolean | null = null;
    statFinancial: boolean | null = null;
    statGrpDetail: boolean | null = null;
    statGrpTot: boolean | null = null;
    logo: ILogo[] = [];
    courtesyLine: ICourtesyLine[] = [];
    slidingMsg: ISlidingMsg | null = null;
    percDiscount: number = 0;
    percAddon: number = 0;
    drawerPulse: number = 0;
    eCRNum: number = 0;
    intInvoice: boolean | null = null;
    invoice2Lines: boolean | null = null;
    invoiceSubtotal: boolean | null = null;
    invoiceClientCheck: boolean | null = null;
    fidelity: boolean | null = null;
    pcsOperatorPrint: boolean | null = null;
    kbdPrebill: boolean | null = null;
    periodCheck: IPeriodCheck | null = null;
    printECRNum: boolean | null = null;
    singleQuantity: boolean | null = null;
    printUnitPrice: boolean | null = null;
    showChange: boolean | null = null;
    mandSubtotal: boolean | null = null;
    cutter: boolean | null = null;
    midnightAlert: boolean | null = null;
    creditNote: boolean | null = null;
    creditNoteProgressive: number = 0;
    cashDeclaration: boolean | null = null;
    printBuffer: boolean | null = null;
    departmentNet: boolean | null = null;
    appendixCut: boolean | null = null;
    vatVentilation: boolean | null = null;
    printLastReceiptFromDGFE: boolean | null = null;
    invoiceProgressive: number = 0;
    receiptLimit: number = 0;
    xMLSendSchedule: IXMLSendSchedule | null = null;
    invoiceText: IInvoiceText[] = [];
    departments: IDepartment[] = [];
    vats: IVat[] = [];
    operators: IOperator[] = [];
    payments: IPayment[] = [];
    groups: IGroup[] = [];
    courtesyLines: ICourtesyLine[] = [];
    headings: IHeadingRow[] = [];

    public constructor();

    public constructor(entries: Array<string>);

    constructor(...entries: any[]) {
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
        this.courtesyLines.push({ id: 1, name: "linea di cortesia 1" });
        this.courtesyLines.push({ id: 2, name: "linea di cortesia 2" });
        this.slidingMsg = { name = "Messaggio scorrevole", value = 1 };
        this.statDepartment = false;
        this.statClerk = false;
        this.statFinancial = false;
        this.statGrpDetail = false;
        this.statGrpTot = false;
        this.statHour = false;
        this.statVat = false;
        this.printECRNum = true;
        this.singleQuantity = false;
        this.printUnitPrice = true;
        this.showChange = true;
        this.mandSubtotal = false;
        this.cutter = false;
        this.midnightAlert = true;
        this.creditNote = false;
        this.cashDeclaration = false;
        this.printBuffer = true;
        this.departmentNet = false;
        this.appendixCut = true;
        this.vatVentilation = false;
        this.printLastReceiptFromDGFE = true;
        this.drawerPulse = 2;
        this.eCRNum = 1;
        this.xMLSendSchedule = { enabled: true, endHour: 30, hours: 40, minutes: 50, startHour: 50, standBy: 10 };

        if (entries.length > 0) {
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
                                let heading = this.headings?.find(h => h.id == row.id)
                                if (heading) {
                                    heading.name = row.name
                                }
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
}