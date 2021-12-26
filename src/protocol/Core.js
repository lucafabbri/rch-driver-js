"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
class Core {
    /**
     * Constructor default is for WebService
     * @param {Boolean} isSerial
     */
    constructor(isSerial = false) {
        this.isSerial = isSerial;
    }
    /**
     * Builds the main header for the request
     */
    header() {
        return '<?xml version="1.0" encoding="UTF - 8"?><Service>';
    }
    /**
     * Build the footer for the request
     */
    footer() {
        return '</Service>';
    }
    /**
     * Encapsulte the command in the xml 'cmd' tag
     * @param {String} protocolCommand
     */
    cmd(protocolCommand) {
        if (this.isSerial) {
            return protocolCommand;
        }
        else {
            return '<cmd>' + protocolCommand + '</cmd>';
        }
    }
    /**
     * Confert boolean value to 0 and 1
     * false = 0
     * true = 1
     *
     * @param {Boolean} value
     */
    parseBool(value) {
        return value ? 1 : 0;
    }
    /**
     * Create the subtotal command =S
     */
    subtotal() {
        return this.cmd("=S");
    }
    /**
     * Create the clear command =K
     */
    clear() {
        return this.cmd("=K");
    }
    /**
     * Create the cancel(Annullo) command =a
     */
    cancel() {
        return this.cmd("=a");
    }
    /**
     * Create the transfer(storno) command =s
     */
    transfer() {
        return this.cmd("=s");
    }
    /**
     * Create the paper peek out command(avanzamento scontrino) =f
     */
    paperPeekOut() {
        return this.cmd("=f");
    }
    /**
     * Creates  a Department Sell command e.g. =R1/$1000
     *
     * @param {Number} departmentId
     * @param {Number} value
     * @param {Number} qty
     */
    departmentSell(departmentId, value, qty = 1) {
        var command = "=R" + departmentId + "/$" + Math.floor(value) + "/*" + Math.floor(qty);
        return this.cmd(command);
    }
    /**
     * Add the lottery code to the receipt e.g. ="/?L/$1/(F1234567)
     *
     * @param {String} code
     */
    lottery(code) {
        var command = '="/?L/$1/(' + code + ')';
        return this.cmd(command);
    }
    /**
     * Create the discount command e.g. =%-/*12.15
     * Percentage is rounded to 2 digits
     *
     * @param {Number} percentage
     * @param {String} description
     */
    discountPercentage(percentage, description) {
        var command = "=%-/*" + (Math.round(percentage * 100) / 100) + "/(" + description + ")";
        return this.cmd(command);
    }
    /**
     * Create the increase command e.g. =%+/*12.15
     * Percentage is rounded to 2 digits
     *
     * @param {Number} percentage
     * @param {String} description
     */
    increasePercentage(percentage, description) {
        var command = "=%+/*" + (Math.round(percentage * 100) / 100) + "/(" + description + ")";
        return this.cmd(command);
    }
    /**
     * Create the discount value command e.g. =V-/*12.15
     *
     *
     * @param {Number} value
     * @param {String} description
     */
    discountValue(value, description) {
        var command = "=V-/*" + Math.floor(value) + "/(" + description + ")";
        return this.cmd(command);
    }
    /**
     * Create the increase value command e.g. =V+/*12.15
     *
     *
     * @param {Number} value
     * @param {String} description
     */
    increaseValue(value, description) {
        var command = "=V+/*" + Math.floor(value) + "/(" + description + ")";
        return this.cmd(command);
    }
    /**
     * Create the increase value command e.g. =V+/*12.15 after subtotal =S
     *
     * @param {Number} value
     * @param {String} description
     */
    increaseValueSubtotal(value, description) {
        return this.subtotal() + this.increaseValue(value, description);
    }
    /**
     * Open the non fiscal receipt =o
     *
     * header == null => Full header
     * header == false => No Header
     * header == true => Only first Header row
     *
     * @param {Boolean} cutPaper
     * @param {Boolean|null} heading
     */
    openNonFiscalReceipt(cutPaper, header) {
        var command = "=o/*" + this.parseBool(cutPaper);
        if (header != null && header) {
            command += "/&2 ";
        }
        else if (header != null && !header) {
            command += "/&1 ";
        }
        return this.cmd(command);
    }
    /**
     * Close the non fiscal receipt =o
     */
    closeNonFiscalReceipt() {
        return this.cmd("=o");
    }
    /**
     * Create the payment command e.g. =T3/$2000
     *
     * @param {Number} paymentId
     * @param {Number} value
     * @param {String|null} description
     */
    payment(paymentId, value, description) {
        var command = "=T" + paymentId + "/$" + Math.floor(value);
        if (description != null && description != "TOTALE") {
            command += "/(" + description.substring(0, 36) + ")";
        }
        return this.cmd(command);
    }
    /**
     *
     * @param {String} date
     * @param {Number} closure
     * @param {Number} number
     */
    checkReturn(date, closure, number) {
        var command = "=k/&" + date + "/[" + closure + "/]" + number + "/*2";
        return this.cmd(command);
    }
    /**
     * Return a receipt providing date closure and number
     *
     * @param {String} date
     * @param {Number} closure
     * @param {Number} number
     */
    returnReceipt(date, closure, number) {
        var command = "=k/&" + date + "/[" + closure + "/]" + number;
        return this.cmd(command);
    }
    /**
     * command to print the last receipt without the amounts of the articles, called “Receipt Gift "(in REG)
     */
    giftReceipt() {
        var command = "=C453/$2";
        return this.cmd(command);
    }
    /**
     * Create the operator command e.g. =O1
     *
     * @param {Number} operatorId
     */
    operator(operatorId) {
        return this.cmd("=O" + operatorId);
    }
    /**
     * Create the receipt close command =c
     */
    closeReceipt() {
        return this.cmd("=c");
    }
    /**
     * Create the command for alfanumeric rows ="/?A/(Prova stampa alfanumerica)
     *
     * @param {String} content
     * @param {Boolean} isDouble
     */
    printRow(content, isDouble) {
        var command = '="/?A/(' + content + ')';
        if (isDouble) {
            command += "/*2";
        }
        return this.cmd(command);
    }
    /**
     * Create the command for alfanumeric rows after total =”/&1/(descrizione 35 chars)
     *
     * @param {String} content
     */
    printRowAfterTotal(content) {
        var command = '="/&1/(' + content.substring(0, 35) + ')';
        return this.cmd(command);
    }
    /**
     * Create the command for alfanumeric rows before fiscal content ="/(stringa alfanumerica)/&1
     *
     * @param {String} content
     */
    printRowBeforeFiscalContent(content) {
        var command = '="/(' + content.substring(0, 48) + ')/&1';
        return this.cmd(command);
    }
    /**
     * Create the command for printing Fiscal Code ="/?C/(01033470251)
     * The fiscal code is not check in its format
     *
     * @param {String} fiscalCode
     */
    printFiscalCode(fiscalCode) {
        return this.cmd('="/?C/(' + fiscalCode + ')');
    }
    /**
     * Enter in reg key =C1
     */
    reg() {
        return this.cmd("=C1");
    }
    /**
     * Enter in x report key =C2
     */
    x() {
        return this.cmd("=C2");
    }
    /**
     * Enter in z report key =C3
     */
    z() {
        return this.cmd("=C3");
    }
    /**
     * Enter in prog key =C4
     */
    prg() {
        return this.cmd("=C4");
    }
    /**
     * Enter in service key =C5
     */
    srv() {
        return this.cmd("=C5");
    }
    /**
     * Read daily situation (x report)
     */
    dailyRead() {
        return this.cmd("=C10");
    }
    /**
     * Do fiscal closure (z report)
     */
    fiscalClosure() {
        return this.cmd("=C10");
    }
    /**
     * Restart the printer
     */
    restart() {
        return this.cmd("=C900");
    }
    /**
     * Send the update on demand command
     */
    updateOnDemand() {
        return this.cmd("=C901");
    }
    /**
     * Try resend pending XML
     */
    sendPendingXmls() {
        return this.cmd("=C422");
    }
    /**
     * Test Agenzia delle Entrate endpoint
     */
    testXmlUrl() {
        return this.cmd("=C170/$502");
    }
    /**
     *
     * @param {Number} rowId
     * @param {String} message
     */
    displayMessage(rowId, message) {
        if (rowId < 1 || rowId > 3) {
            return "";
        }
        else {
            return this.cmd("=D" + rowId + "/(" + message + ")");
        }
    }
    /**
     * Create the Create BarCode command ="/$2/(4006381333641)
     * @param {Number} type
     * @param {String} code
     */
    printBarCode(type, code) {
        return this.cmd('="/$' + type + '/(' + code + ')');
    }
    /**
     * Create BarCode of type: UPC-E
     * @param {String} code
     */
    printBarCode_UpcE(code) {
        return this.printBarCode(1, code);
    }
    /**
     * Create BarCode of type: EAN-13
     * @param {String} code
     */
    printBarCode_Ean13(code) {
        return this.printBarCode(2, code);
    }
    /**
     * Create BarCode of type: EAN-8
     * @param {String} code
     */
    printBarCode_Ean8(code) {
        return this.printBarCode(3, code);
    }
    /**
     * Create BarCode of type: CODE-39
     * @param {String} code
     */
    printBarCode_Code39(code) {
        return this.printBarCode(4, code);
    }
    /**
     * Create BarCode of type: UPC-A
     * @param {String} code
     */
    printBarCode_UpcA(code) {
        return this.printBarCode(5, code);
    }
    /**
     * Create BarCode of type: ITF
     * @param {String} code
     */
    printBarCode_Itf(code) {
        return this.printBarCode(6, code);
    }
    /**
     * Create BarCode of type: CODABAR
     * @param {String} code
     */
    printBarCode_Codabar(code) {
        return this.printBarCode(7, code);
    }
    /**
     * Create BarCode of type: CODE-128
     * @param {String} code
     */
    printBarCode_Code128(code) {
        return this.printBarCode(8, code);
    }
    /**
     * Create BarCode of type: CODE-93
     * @param {String} code
     */
    printBarCode_Code93(code) {
        return this.printBarCode(9, code);
    }
    /**
     * Create BarCode of type: QR CODE
     * @param {String} code
     */
    printBarCode_QRCode(code) {
        return this.printBarCode(11, code);
    }
    /**
     * Get the DGFE Status
     */
    dgfeStatus() {
        return this.cmd("<</?i");
    } /**
   * Send the periodic assessment command
   */
    periodicAssessmentStatus() {
        return this.cmd("<</?i/*2");
    }
    /**
     * Check DGFE free space
     */
    dgfeFreeSpace() {
        return this.cmd("<</?g");
    }
    /**
     * Verify the status of print <<?s
     */
    printStatus() {
        return this.cmd("<</?s");
    }
    /**
     * Check the printer status
     */
    printerStatus() {
        return this.cmd("<</?i/*4");
    }
    /**
     * Check RT status
     */
    rtStatus() {
        return this.cmd("<</?i/*3");
    }
    /**
     * Check pending XML status
     */
    pendingXmlStatus() {
        return this.cmd("</?i/*5");
    }
    /**
     * Check if the RT is in service
     */
    inServiceStatus() {
        return this.cmd("<</?D");
    }
    /**
     * Get all programming
     */
    allProgramming() {
        return this.cmd("<</?C");
    }
    /**
     * Program a the Vat on ticket
     *
     * @param {Boolean} vat_on_ticket
     */
    C125(vat_on_ticket) {
        return this.cmd(">C125/$" + this.parseBool(vat_on_ticket));
    }
    /**
     * Program the midnight alert
     *
     * @param {Boolean} midnight_alert
     */
    C126(midnight_alert) {
        return this.cmd(">C126/$" + this.parseBool(midnight_alert));
    }
    /**
     * program the print of the register number
     *
     * @param {Boolean} print_register_number
     */
    C132(print_register_number) {
        return this.cmd(">C132/$" +
            this.parseBool(print_register_number));
    }
    /**
     * Program id the subtotal is required
     *
     * @param {Boolean} subtotal_required
     */
    C133(subtotal_required) {
        return this.cmd(">C133/$" + this.parseBool(subtotal_required));
    }
    /**
     * Program the maximum receipt amount
     *
     * @param {Number} max_receipt_amount
     */
    C135(max_receipt_amount) {
        return this.cmd(">C135/$" + max_receipt_amount);
    }
    /**
     * Program the change on payments
     *
     * @param {Boolean} change_on_payments
     */
    C136(change_on_payments) {
        return this.cmd(">C136/$" + this.parseBool(change_on_payments));
    }
    /**
     * Program the deprtment net
     * @param {Boolean} department_net
     */
    C138(department_net) {
        return this.cmd(">C138/$" + this.parseBool(department_net));
    }
    /**
     * Program the appendix in the rt
     *
     * @param {Boolean} rt_print_appendix
     * @param {Boolean} rt_enable_appendix_Cut
     */
    C170(rt_print_appendix, rt_enable_appendix_Cut) {
        return this.cmd(">C170/$501/&" + this.parseBool(rt_print_appendix) + "/[" + this.parseBool(rt_enable_appendix_Cut));
    }
    /**
     * Download DGFE data at specific date format DDMMYY e.g. 010121 (January 1st 2021)
     *
     * @param {String} date
     */
    C452(date) {
        return this.cmd("=C452/$0/&" + date + "/[1/]9999");
    }
    /**
     * Program the invoice on the rt
     *
     * @param {Boolean} invoice_on_receipt_enable
     * @param {Boolean} receipt_print_on_2_lines
     * @param {Boolean} invoice_subtotal_enable
     * @param {Boolean} invoice_disable_check_client
     * @param {Boolean} invoice_print_unit_price
     */
    C917(invoice_on_receipt_enable, receipt_print_on_2_lines, invoice_subtotal_enable, invoice_disable_check_client, invoice_print_unit_price) {
        return this.cmd(">C917/&" + this.parseBool(invoice_on_receipt_enable) +
            "/*" + this.parseBool(receipt_print_on_2_lines) +
            "/]" + this.parseBool(invoice_subtotal_enable) +
            "/_" + this.parseBool(invoice_disable_check_client) +
            "/@" + this.parseBool(invoice_print_unit_price));
    }
    /**
     * Program one specific header line >C918/*1/$1/(Testo max 48 caratteri)
     * text is trimmed and equally spaced to center the content
     *
     * @param {Number} id
     * @param {String} name
     */
    C918(id, name) {
        var trimmedName = name.substr(0, 48).trim();
        var spacedName = "";
        if (trimmedName.length < 48) {
            var spaces = Math.floor((48 - trimmedName.length) / 2);
            spacedName = trimmedName.padStart(trimmedName.length + spaces, " ").padEnd(48, " ");
        }
        return this.cmd(">C918/*1/$" + id + "/(" + spacedName + ")");
    }
    /**
     * Program unit price and single quantity
     *
     * @param {Boolean} print_unit_price
     * @param {Boolean} print_single_quantity
     */
    C927(print_unit_price, print_single_quantity) {
        return this.cmd(">C927/*" + this.parseBool(print_unit_price) +
            "/$" + this.parseBool(print_single_quantity));
    }
    /**
     * Program the disable double feed
     *
     * @param {Boolean} disable_double_feed
     */
    C928(disable_double_feed) {
        return this.cmd(">C928/&5/$" + this.parseBool(disable_double_feed));
    }
    /**
     * Program the print with buffering
     *
     * @param {Boolean} print_with_buffering
     */
    C932(print_with_buffering) {
        return this.cmd(">C932/$" + this.parseBool(print_with_buffering));
    }
    /**
     * Program the notify cash
     *
     * @param {Boolean} notify_cash
     */
    C980(notify_cash) {
        return this.cmd(">C980/$" + this.parseBool(notify_cash));
    }
    /**
     * Enables the cutter
     *
     * @param {Boolean} enabled_cutter
     */
    C997(enabled_cutter) {
        return this.cmd(">C997/$" + this.parseBool(enabled_cutter));
    }
    /**
     * Program the heading rows (0-6)
     * and the Invoice heading rows (7-13)
     *
     * @param {Number} headingRow
     * @param {String} description
     */
    H(headingRow, description) {
        return this.cmd(" >>/?H/$" + headingRow + "/(" + description.substring(0, 48) + ")");
    }
    /**
     * Program the cortesy lines rows (0-2)
     *
     * @param {Number} courtesyRow
     * @param {String} description
     */
    t(courtesyRow, description) {
        return this.cmd(" >>/?t/$" + courtesyRow + "/(" + description.substring(0, 48) + ")");
    }
    /**
     * Program an operator
     *
     * @param {Number} operatorId
     * @param {String} name
     */
    O(operatorId, name) {
        return this.cmd(">O" + operatorId +
            "/?A/(" + name.substring(0, 20) + ")");
    }
    /**
     * Program a Department
     *
     * @param {Number} deptId
     * @param {Number} price
     * @param {Number} vat
     * @param {String} name
     * @param {Number} halo
     * @param {Number} lalo
     * @param {Boolean} single
     * @param {Number|null} grp_code
     * @param {String} dpt_type
     */
    R(deptId, price, vat, name, halo, lalo, single, grp_code, dpt_type) {
        return this.cmd(">R" + deptId +
            "/?A/$" + price +
            "/*" + vat +
            "/(" + name +
            ")/&" + halo +
            "/[" + lalo +
            "/]" + this.parseBool(single) +
            "/_" + (grp_code === null || grp_code === undefined ? 0 : grp_code) +
            "/@" + dpt_type);
    }
    /**
     * Program a payment
     *
     * @param {Number} paymentId
     * @param {String} name
     * @param {Boolean} change
     * @param {Boolean} cash
     * @param {Boolean} pay_discount
     * @param {String} tender_credit_type
     * @param {Boolean} opendrawer
     * @param {Boolean} input_total_amount
     * @param {Boolean} ticket
     */
    T(paymentId, name, change, cash, pay_discount, tender_credit_type, opendrawer, input_total_amount, ticket) {
        return this.cmd(">T" + paymentId +
            "/?A/$" + this.parseBool(change) +
            "/&" + this.parseBool(cash) +
            "/[" + (pay_discount ? 5 : tender_credit_type) +
            "/]" + this.parseBool(opendrawer) +
            "/^" + this.parseBool(input_total_amount) +
            "/_" + this.parseBool(ticket) +
            "/(" + name.substring(0, 20) +
            ")");
    }
    /**
     * Program department discount
     *
     * @param {Boolean} department_discount
     */
    U(department_discount) {
        return this.cmd(">U/$" + this.parseBool(department_discount));
    }
    /**
     * Program a vat
     *
     * @param {Number} vatId
     * @param {String} rate_type
     * @param {Number} value
     * @param {String} ateco_code
     */
    V(vatId, rate_type, value, ateco_code) {
        var type = this.rateStringToInt(rate_type);
        return this.cmd(">>/?V/$" + vatId +
            "/*" + ((type == 1) ? this.natureStringToInt(rate_type) : value) +
            "/&" + type +
            "/(" + ateco_code +
            ")");
    }
    /**
     * Util to convert Department type string to integer
     * @param {String} val
     */
    dptTypeStringToInt(val) {
        return val == "E_DPT_GOOD" ? "0" : "1";
    }
    /**
     * Util to convert Department type int to string
     * @param {Number} val
     */
    dptIntToTypeString(val) {
        return val == 0 ? "E_DPT_GOOD" : "E_DPT_SERVICE";
    }
    /**
     * Util to convert rate type string to integer
     * @param {String} value
     */
    rateStringToInt(value) {
        switch (value) {
            case "VAT":
                return 0;
            case "EE":
                return 1;
            case "NS":
                return 1;
            case "NI":
                return 1;
            case "ES":
                return 1;
            case "RM":
                return 1;
            case "AL":
                return 1;
            case "VI":
                return 2;
            default:
                return null;
        }
    }
    /**
     * Util to convert nature type string to integer
     * @param {String} value
     */
    natureStringToInt(value) {
        switch (value) {
            case "EE":
                return 1;
            case "NS":
                return 2;
            case "NI":
                return 3;
            case "ES":
                return 4;
            case "RM":
                return 5;
            case "AL":
                return 6;
            default:
                return null;
        }
    }
    /**
     * Util to convert credit type string to integer
     * @param {String} tender_credit_type
     */
    creditStringToInt(tender_credit_type) {
        try {
            switch (tender_credit_type) {
                case "E_CREDIT_GOOD":
                    return 1;
                case "E_CREDIT_SERVICE":
                    return 2;
                case "E_CREDIT_FAT_DC":
                    return 3;
                case "E_CREDIT_FAT_DCR_SSN":
                    return 4;
                case "E_PAY_DISCOUNT":
                    return 5;
                case "E_NO_CREDIT":
                    return 0;
                default:
                    return null;
            }
        }
        catch (_a) {
            return null;
        }
    }
    /**
     * Util to convert credit type integer to string
     * @param {Number} tender_credit_type
     */
    creditIntToString(tender_credit_type) {
        try {
            switch (tender_credit_type) {
                case 1:
                    return "E_CREDIT_GOOD";
                case 2:
                    return "E_CREDIT_SERVICE";
                case 3:
                    return "E_CREDIT_FAT_DC";
                case 4:
                    return "E_CREDIT_FAT_DCR_SSN";
                case 5:
                    return "E_PAY_DISCOUNT";
                case 0:
                    return "E_NO_CREDIT";
                default:
                    return "E_NO_CREDIT";
            }
        }
        catch (_a) {
            return "E_NO_CREDIT";
        }
    }
}
exports.Core = Core;
