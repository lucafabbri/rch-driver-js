"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prog = void 0;
const AbstractParser_1 = require("./AbstractParser");
const CourtesyLine_1 = require("./CourtesyLine");
const Department_1 = require("./Department");
const Group_1 = require("./Group");
const HeadingRow_1 = require("./HeadingRow");
const InvoiceText_1 = require("./InvoiceText");
const Operator_1 = require("./Operator");
const Payment_1 = require("./Payment");
const Vat_1 = require("./Vat");
const XMLSendSchedule_1 = require("./XMLSendSchedule");
class Prog extends AbstractParser_1.AbstractParser {
    constructor(entries) {
        var _a;
        super();
        this.statDepartment = null;
        this.statVat = null;
        this.statHour = null;
        this.statClerk = null;
        this.statFinancial = null;
        this.statGrpDetail = null;
        this.statGrpTot = null;
        this.logo = [];
        this.courtesyLine = [];
        this.slidingMsg = null;
        this.percDiscount = 0;
        this.percAddon = 0;
        this.drawerPulse = 0;
        this.eCRNum = 0;
        this.intInvoice = null;
        this.invoice2Lines = null;
        this.invoiceSubtotal = null;
        this.invoiceClientCheck = null;
        this.fidelity = null;
        this.pcsOperatorPrint = null;
        this.kbdPrebill = null;
        this.periodCheck = null;
        this.printECRNum = null;
        this.singleQuantity = null;
        this.printUnitPrice = null;
        this.showChange = null;
        this.mandSubtotal = null;
        this.cutter = null;
        this.midnightAlert = null;
        this.creditNote = null;
        this.creditNoteProgressive = 0;
        this.cashDeclaration = null;
        this.printBuffer = null;
        this.departmentNet = null;
        this.appendixCut = null;
        this.vatVentilation = null;
        this.printLastReceiptFromDGFE = null;
        this.invoiceProgressive = 0;
        this.receiptLimit = 0;
        this.xMLSendSchedule = null;
        this.invoiceText = [];
        this.departments = [];
        this.vats = [];
        this.operators = [];
        this.payments = [];
        this.groups = [];
        this.courtesyLines = [];
        this.headings = [];
        this.departments = [];
        this.vats = [];
        this.operators = [];
        this.payments = [];
        this.groups = [];
        this.headings = [];
        for (var i = 1; i <= 13; i++) {
            this.headings.push({ id: i });
        }
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            try {
                switch (entry.charAt(0)) {
                    case 'R':
                        this.departments.push(new Department_1.Department(entry, entries[i + 1]));
                        i++;
                        break;
                    case 't':
                        if (!this.courtesyLine) {
                            this.courtesyLine = [];
                        }
                        this.courtesyLine.push(new CourtesyLine_1.CourtesyLine(entry, entries[i + 1]));
                        i++;
                        break;
                    case 'H':
                        var row = new HeadingRow_1.HeadingRow(entry, entries[i + 1]);
                        try {
                            let heading = (_a = this.headings) === null || _a === void 0 ? void 0 : _a.find(h => h.id == row.id);
                            if (heading) {
                                heading.name = row.name;
                            }
                        }
                        catch (_b) {
                            //silent is golden
                        }
                        i++;
                        break;
                    case 'V':
                        this.vats.push(new Vat_1.Vat(entry));
                        break;
                    case 'T':
                        this.payments.push(new Payment_1.Payment(entry));
                        break;
                    case 'O':
                        this.operators.push(new Operator_1.Operator(entry));
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
                                this.eCRNum = parseInt(entry.substring(5, 3));
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
                                    this.groups = [];
                                }
                                this.groups.push(new Group_1.Group(entry));
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
                                this.xMLSendSchedule = new XMLSendSchedule_1.XMLSendSchedule(entry);
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
                                    this.invoiceText = [];
                                }
                                this.invoiceText.push(new InvoiceText_1.InvoiceText(entry, entries[i + 1]));
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
            }
            catch (_c) {
                //silent is golden
            }
        }
    }
}
exports.Prog = Prog;
