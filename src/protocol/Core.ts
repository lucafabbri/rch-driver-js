export class Core {
    isSerial: boolean;
    /**
     * Constructor default is for WebService
     * @param {Boolean} isSerial 
     */
    constructor(isSerial = false) {
        this.isSerial = isSerial
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
        return '</Service>'
    }
    /**
     * Encapsulte the command in the xml 'cmd' tag
     * @param {String} protocolCommand 
     */
    cmd(protocolCommand: string): string {
        if (this.isSerial) {
            return protocolCommand;
        } else {
            return '<cmd>' + protocolCommand + '</cmd>'
        }
    }
    /**
     * Confert boolean value to 0 and 1
     * false = 0
     * true = 1
     * 
     * @param {Boolean} value 
     */
    parseBool(value: boolean): number {
        return value ? 1 : 0
    }
    /**
     * Create the subtotal command =S
     */
    subtotal(): string {
        return this.cmd("=S")
    }
    /**
     * Create the clear command =K
     */
    clear(): string {
        return this.cmd("=K")
    }
    /**
     * Create the cancel(Annullo) command =a
     */
    cancel(): string {
        return this.cmd("=a")
    }
    /**
     * Create the transfer(storno) command =s
     */
    transfer(): string {
        return this.cmd("=s")
    }
    /**
     * Create the paper peek out command(avanzamento scontrino) =f
     */
    paperPeekOut(): string {
        return this.cmd("=f")
    }
    /**
     * Creates  a Department Sell command e.g. =R1/$1000
     * 
     * @param {Number} departmentId 
     * @param {Number} value 
     * @param {Number} qty
     */
    departmentSell(departmentId: number, value: number, qty = 1): string {
        var command = "=R" + departmentId + "/$" + Math.floor(value) + "/*" + Math.floor(qty)
        return this.cmd(command)
    }
    /**
     * Add the lottery code to the receipt e.g. ="/?L/$1/(F1234567)
     * 
     * @param {String} code 
     */
    lottery(code: string): string {
        var command = '="/?L/$1/(' + code + ')'
        return this.cmd(command)
    }
    /**
     * Create the discount command e.g. =%-/*12.15
     * Percentage is rounded to 2 digits
     * 
     * @param {Number} percentage 
     * @param {String} description
     */
    discountPercentage(percentage: number, description: string): string {
        var command = "=%-/*" + (Math.round(percentage * 100) / 100) + "/(" + description + ")"
        return this.cmd(command)
    }
    /**
     * Create the increase command e.g. =%+/*12.15
     * Percentage is rounded to 2 digits
     * 
     * @param {Number} percentage
     * @param {String} description
     */
    increasePercentage(percentage: number, description: string): string {
        var command = "=%+/*" + (Math.round(percentage * 100) / 100) + "/(" + description + ")"
        return this.cmd(command)
    }
    /**
     * Create the discount value command e.g. =V-/*12.15
     * 
     * 
     * @param {Number} value
     * @param {String} description
     */
    discountValue(value: number, description: string): string {
        var command = "=V-/*" + Math.floor(value) + "/(" + description + ")"
        return this.cmd(command)
    }
    /**
     * Create the increase value command e.g. =V+/*12.15
     * 
     * 
     * @param {Number} value
     * @param {String} description
     */
    increaseValue(value: number, description: string): string {
        var command = "=V+/*" + Math.floor(value) + "/(" + description + ")"
        return this.cmd(command)
    }
    /**
     * Create the increase value command e.g. =V+/*12.15 after subtotal =S
     * 
     * @param {Number} value
     * @param {String} description
     */
    increaseValueSubtotal(value: number, description: string) {
        return this.subtotal() + this.increaseValue(value, description)
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
    openNonFiscalReceipt(cutPaper: boolean, header: boolean | null): string {
        var command = "=o/*" + this.parseBool(cutPaper)

        if (header != null && header) {
            command += "/&2 "
        } else if (header != null && !header) {
            command += "/&1 "
        }

        return this.cmd(command)
    }
    /**
     * Close the non fiscal receipt =o
     */
    closeNonFiscalReceipt(): string {
        return this.cmd("=o")
    }
    /**
     * Create the payment command e.g. =T3/$2000
     *
     * @param {Number} paymentId
     * @param {Number} value
     * @param {String|null} description
     */
    payment(paymentId: number, value: number, description: string | null): string {
        var command = "=T" + paymentId + "/$" + Math.floor(value)
        if (description != null && description != "TOTALE") {
            command += "/(" + description.substring(0, 36) + ")"
        }
        return this.cmd(command)
    }
    /**
     * 
     * @param {String} date 
     * @param {Number} closure 
     * @param {Number} number 
     */
    checkReturn(date: string, closure: number, number: number): string {
        var command = "=k/&" + date + "/[" + closure + "/]" + number + "/*2"
        return this.cmd(command)
    }

    /**
     * Return a receipt providing date closure and number
     * 
     * @param {String} date 
     * @param {Number} closure 
     * @param {Number} number 
     */
    returnReceipt(date: string, closure: number, number: number): string {
        var command = "=k/&" + date + "/[" + closure + "/]" + number
        return this.cmd(command);
    }

    /**
     * command to print the last receipt without the amounts of the articles, called “Receipt Gift "(in REG)
     */
    giftReceipt(): string {
        var command = "=C453/$2"
        return this.cmd(command);
    }
    /**
     * Create the operator command e.g. =O1
     * 
     * @param {Number} operatorId
     */
    operator(operatorId: number): string {
        return this.cmd("=O" + operatorId)
    }
    /**
     * Create the receipt close command =c
     */
    closeReceipt(): string {
        return this.cmd("=c")
    }
    /**
     * Create the command for alfanumeric rows ="/?A/(Prova stampa alfanumerica)
     * 
     * @param {String} content 
     * @param {Boolean} isDouble
     */
    printRow(content: string, isDouble: boolean): string {
        var command = '="/?A/(' + content + ')';
        if (isDouble) {
            command += "/*2"
        }
        return this.cmd(command)
    }
    /**
     * Create the command for alfanumeric rows after total =”/&1/(descrizione 35 chars)
     *
     * @param {String} content
     */
    printRowAfterTotal(content: string): string {
        var command = '="/&1/(' + content.substring(0, 35) + ')';
        return this.cmd(command)
    }
    /**
     * Create the command for alfanumeric rows before fiscal content ="/(stringa alfanumerica)/&1
     *
     * @param {String} content
     */
    printRowBeforeFiscalContent(content: string): string {
        var command = '="/(' + content.substring(0, 48) + ')/&1';
        return this.cmd(command)
    }
    /**
     * Create the command for printing Fiscal Code ="/?C/(01033470251)
     * The fiscal code is not check in its format
     * 
     * @param {String} fiscalCode 
     */
    printFiscalCode(fiscalCode: string): string {
        return this.cmd('="/?C/(' + fiscalCode + ')')
    }
    /**
     * Enter in reg key =C1
     */
    reg(): string {
        return this.cmd("=C1")
    }
    /**
     * Enter in x report key =C2
     */
    x(): string {
        return this.cmd("=C2")
    }
    /**
     * Enter in z report key =C3
     */
    z(): string {
        return this.cmd("=C3")
    }
    /**
     * Enter in prog key =C4
     */
    prg(): string {
        return this.cmd("=C4")
    }
    /**
     * Enter in service key =C5
     */
    srv(): string {
        return this.cmd("=C5")
    }
    /**
     * Read daily situation (x report)
     */
    dailyRead(): string {
        return this.cmd("=C10")
    }
    /**
     * Do fiscal closure (z report)
     */
    fiscalClosure(): string {
        return this.cmd("=C10")
    }
    /**
     * Restart the printer
     */
    restart(): string {
        return this.cmd("=C900")
    }
    /**
     * Send the update on demand command
     */
    updateOnDemand(): string {
        return this.cmd("=C901")
    }
    /**
     * Try resend pending XML
     */
    sendPendingXmls(): string {
        return this.cmd("=C422")
    }
    /**
     * Test Agenzia delle Entrate endpoint
     */
    testXmlUrl(): string {
        return this.cmd("=C170/$502")
    }
    /**
     * 
     * @param {Number} rowId 
     * @param {String} message 
     */
    displayMessage(rowId: number, message: string): string {
        if (rowId < 1 || rowId > 3) {
            return;
        } else {
            return this.cmd("=D" + rowId + "/(" + message + ")")
        }
    }
    /**
     * Create the Create BarCode command ="/$2/(4006381333641)
     * @param {Number} type 
     * @param {String} code 
     */
    printBarCode(type: number, code: string): string {
        return this.cmd('="/$' + type + '/(' + code + ')')
    }
    /**
     * Create BarCode of type: UPC-E
     * @param {String} code 
     */
    printBarCode_UpcE(code: string): string {
        return this.printBarCode(1, code)
    }
    /**
     * Create BarCode of type: EAN-13
     * @param {String} code
     */
    printBarCode_Ean13(code: string): string {
        return this.printBarCode(2, code)
    }
    /**
     * Create BarCode of type: EAN-8
     * @param {String} code
     */
    printBarCode_Ean8(code: string): string {
        return this.printBarCode(3, code)
    }
    /**
     * Create BarCode of type: CODE-39
     * @param {String} code
     */
    printBarCode_Code39(code: string): string {
        return this.printBarCode(4, code)
    }
    /**
     * Create BarCode of type: UPC-A
     * @param {String} code
     */
    printBarCode_UpcA(code: string): string {
        return this.printBarCode(5, code)
    }
    /**
     * Create BarCode of type: ITF
     * @param {String} code
     */
    printBarCode_Itf(code: string): string {
        return this.printBarCode(6, code)
    }
    /**
     * Create BarCode of type: CODABAR
     * @param {String} code
     */
    printBarCode_Codabar(code: string): string {
        return this.printBarCode(7, code)
    }
    /**
     * Create BarCode of type: CODE-128
     * @param {String} code
     */
    printBarCode_Code128(code: string): string {
        return this.printBarCode(8, code)
    }
    /**
     * Create BarCode of type: CODE-93
     * @param {String} code
     */
    printBarCode_Code93(code: string): string {
        return this.printBarCode(9, code)
    }
    /**
     * Create BarCode of type: QR CODE
     * @param {String} code
     */
    printBarCode_QRCode(code: string): string {
        return this.printBarCode(11, code)
    }
    /**
     * Get the DGFE Status
     */
    dgfeStatus(): string {
        return this.cmd("<</?i")
    }/**
   * Send the periodic assessment command
   */
    periodicAssessmentStatus(): string {
        return this.cmd("<</?i/*2")
    }
    /**
     * Check DGFE free space
     */
    dgfeFreeSpace(): string {
        return this.cmd("<</?g")
    }
    /**
     * Verify the status of print <<?s
     */
    printStatus(): string {
        return this.cmd("<</?s")
    }
    /**
     * Check the printer status
     */
    printerStatus(): string {
        return this.cmd("<</?i/*4")
    }
    /**
     * Check RT status
     */
    rtStatus(): string {
        return this.cmd("<</?i/*3")
    }
    /**
     * Check pending XML status
     */
    pendingXmlStatus(): string {
        return this.cmd("</?i/*5")
    }
    /**
     * Check if the RT is in service
     */
    inServiceStatus(): string {
        return this.cmd("<</?D")
    }
    /**
     * Get all programming
     */
    allProgramming(): string {
        return this.cmd("<</?C")
    }
    /**
     * Program a the Vat on ticket
     * 
     * @param {Boolean} vat_on_ticket 
     */
    C125(vat_on_ticket: boolean): string {
        return this.cmd(">C125/$" + this.parseBool(vat_on_ticket))
    }
    /**
     * Program the midnight alert
     * 
     * @param {Boolean} midnight_alert 
     */
    C126(midnight_alert: boolean): string {
        return this.cmd(">C126/$" + this.parseBool(midnight_alert))
    }
    /**
     * program the print of the register number
     * 
     * @param {Boolean} print_register_number 
     */
    C132(print_register_number: boolean): string {
        return this.cmd(">C132/$" +
            this.parseBool(print_register_number))
    }
    /**
     * Program id the subtotal is required
     * 
     * @param {Boolean} subtotal_required 
     */
    C133(subtotal_required: boolean): string {
        return this.cmd(">C133/$" + this.parseBool(subtotal_required))
    }
    /**
     * Program the maximum receipt amount
     * 
     * @param {Number} max_receipt_amount 
     */
    C135(max_receipt_amount: number): string {
        return this.cmd(">C135/$" + max_receipt_amount)
    }
    /**
     * Program the change on payments
     * 
     * @param {Boolean} change_on_payments 
     */
    C136(change_on_payments: boolean): string {
        return this.cmd(">C136/$" + this.parseBool(change_on_payments))
    }
    /**
     * Program the deprtment net
     * @param {Boolean} department_net 
     */
    C138(department_net: boolean): string {
        return this.cmd(">C138/$" + this.parseBool(department_net))
    }
    /**
     * Program the appendix in the rt
     * 
     * @param {Boolean} rt_print_appendix 
     * @param {Boolean} rt_enable_appendix_Cut 
     */
    C170(rt_print_appendix: boolean, rt_enable_appendix_Cut: boolean): string {
        return this.cmd(">C170/$501/&" + this.parseBool(rt_print_appendix) + "/[" + this.parseBool(rt_enable_appendix_Cut))
    }
    /**
     * Download DGFE data at specific date format DDMMYY e.g. 010121 (January 1st 2021)
     * 
     * @param {String} date 
     */
    C452(date: string): string {
        return this.cmd("=C452/$0/&" + date + "/[1/]9999")
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
    C917(invoice_on_receipt_enable: boolean, receipt_print_on_2_lines: boolean, invoice_subtotal_enable: boolean, invoice_disable_check_client: boolean, invoice_print_unit_price: boolean): string {
        return this.cmd(
            ">C917/&" + this.parseBool(invoice_on_receipt_enable) +
            "/*" + this.parseBool(receipt_print_on_2_lines) +
            "/]" + this.parseBool(invoice_subtotal_enable) +
            "/_" + this.parseBool(invoice_disable_check_client) +
            "/@" + this.parseBool(invoice_print_unit_price))
    }
    /**
     * Program one specific header line >C918/*1/$1/(Testo max 48 caratteri) 
     * text is trimmed and equally spaced to center the content
     * 
     * @param {Number} id 
     * @param {String} name 
     */
    C918(id: number, name: string): string {
        var trimmedName = name.substr(0, 48).trim();

        if (trimmedName.length < 48) {
            var spaces = Math.floor((48 - trimmedName.length) / 2);
            var spacedName = trimmedName.padStart(trimmedName.length + spaces, " ").padEnd(48, " ");
        }
        return this.cmd(">C918/*1/$" + id + "/(" + spacedName + ")");
    }
    /**
     * Program unit price and single quantity
     * 
     * @param {Boolean} print_unit_price 
     * @param {Boolean} print_single_quantity 
     */
    C927(print_unit_price: boolean, print_single_quantity: boolean): string {
        return this.cmd(
            ">C927/*" + this.parseBool(print_unit_price) +
            "/$" + this.parseBool(print_single_quantity))
    }
    /**
     * Program the disable double feed
     * 
     * @param {Boolean} disable_double_feed 
     */
    C928(disable_double_feed: boolean): string {
        return this.cmd(
            ">C928/&5/$" + this.parseBool(disable_double_feed))
    }
    /**
     * Program the print with buffering
     * 
     * @param {Boolean} print_with_buffering 
     */
    C932(print_with_buffering: boolean): string {
        return this.cmd(
            ">C932/$" + this.parseBool(print_with_buffering))
    }
    /**
     * Program the notify cash
     * 
     * @param {Boolean} notify_cash 
     */
    C980(notify_cash: boolean): string {
        return this.cmd(
            ">C980/$" + this.parseBool(notify_cash))
    }
    /**
     * Enables the cutter
     * 
     * @param {Boolean} enabled_cutter 
     */
    C997(enabled_cutter: boolean): string {
        return this.cmd(">C997/$" + this.parseBool(enabled_cutter))
    }
    /**
     * Program the heading rows (0-6)
     * and the Invoice heading rows (7-13)
     * 
     * @param {Number} headingRow 
     * @param {String} description 
     */
    H(headingRow: number, description: string): string {
        return this.cmd(" >>/?H/$" + headingRow + "/(" + description.substring(0, 48) + ")")
    }
    /**
     * Program the cortesy lines rows (0-2)
     * 
     * @param {Number} courtesyRow
     * @param {String} description 
     */
    t(courtesyRow: number, description: string): string {
        return this.cmd(" >>/?t/$" + courtesyRow + "/(" + description.substring(0, 48) + ")")
    }
    /**
     * Program an operator
     * 
     * @param {Number} operatorId 
     * @param {String} name 
     */
    O(operatorId: number, name: string): string {
        return this.cmd(">O" + operatorId +
            "/?A/(" + name.substring(0, 20) + ")")
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
    R(deptId: number, price: number, vat: number, name: string, halo: number, lalo: number, single: boolean, grp_code: number | null, dpt_type: string): string {
        return this.cmd(">R" + deptId +
            "/?A/$" + price +
            "/*" + (vat === false || vat === true ? 0 : vat) +
            "/(" + name +
            ")/&" + halo +
            "/[" + lalo +
            "/]" + this.parseBool(single) +
            "/_" + (grp_code === null || grp_code === undefined ? 0 : grp_code) +
            "/@" + dpt_type)
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
    T(paymentId: number, name: string, change: boolean, cash: boolean, pay_discount: boolean, tender_credit_type: string, opendrawer: boolean, input_total_amount: boolean, ticket: boolean): string {
        return this.cmd(">T" + paymentId +
            "/?A/$" + this.parseBool(change) +
            "/&" + this.parseBool(cash) +
            "/[" + (pay_discount ? 5 : tender_credit_type) +
            "/]" + this.parseBool(opendrawer) +
            "/^" + this.parseBool(input_total_amount) +
            "/_" + this.parseBool(ticket) +
            "/(" + name.substring(0, 20) +
            ")")
    }
    /**
     * Program department discount
     * 
     * @param {Boolean} department_discount 
     */
    U(department_discount: boolean): string {
        return this.cmd(">U/$" + this.parseBool(department_discount))
    }
    /**
     * Program a vat
     * 
     * @param {Number} vatId 
     * @param {String} rate_type 
     * @param {Number} value 
     * @param {String} ateco_code 
     */
    V(vatId: number, rate_type: string, value: number, ateco_code: string) {
        var type = this.rateStringToInt(rate_type);
        return this.cmd(">>/?V/$" + vatId +
            "/*" + ((type == 1) ? this.natureStringToInt(rate_type) : value) +
            "/&" + type +
            "/(" + ateco_code +
            ")")
    }

    /**
     * Util to convert Department type string to integer
     * @param {String} val 
     */
    dptTypeStringToInt(val: string): string {
        return val == "E_DPT_GOOD" ? "0" : "1";
    }
    /**
     * Util to convert Department type int to string
     * @param {Number} val 
     */
    dptIntToTypeString(val: number): string {
        return val == 0 ? "E_DPT_GOOD" : "E_DPT_SERVICE";
    }
    /**
     * Util to convert rate type string to integer
     * @param {String} value 
     */
    rateStringToInt(value: string): number {
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
        }
    }
    /**
     * Util to convert nature type string to integer
     * @param {String} value 
     */
    natureStringToInt(value: string): number {
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
        }
    }
    /**
     * Util to convert credit type string to integer
     * @param {String} tender_credit_type 
     */
    creditStringToInt(tender_credit_type: string): number {
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
            }
        } catch {
            return 0;
        }
    }
    /**
     * Util to convert credit type integer to string
     * @param {Number} tender_credit_type 
     */
    creditIntToString(tender_credit_type: number): string {
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
            }
        } catch {
            return "E_NO_CREDIT";
        }
    }
}