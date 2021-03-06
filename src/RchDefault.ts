import { DeviceType } from "./DeviceType";
import { IPayment } from "./interfaces/IPayment";
import { IProg } from "./interfaces/IProg";
import { Prog } from "./models/Prog";
import { DeviceCapabilites } from "./DeviceCapabilities";

/**
 * Utility class with devices defaults values
 * @date 1/11/2022 - 2:15:22 PM
 *
 * @export
 * @class RchDefault
 * @typedef {RchDefault}
 */
export class RchDefault {
	/**
	 * All devices capabilities
	 * @date 1/11/2022 - 2:15:43 PM
	 *
	 * @type {Array<DeviceCapabilites>}
	 */
	deviceCapabilities: Array<DeviceCapabilites> = [];

	/**
	 * PRINTF type defaults
	 * @date 1/11/2022 - 2:15:53 PM
	 *
	 * @type {string}
	 */
	PRINTF_PROG: string =
		'{"statDepartment":false,"statVat":false,"statHour":false,"statClerk":false,"statFinancial":false,"statGrpDetail":false,"statGrpTot":false,"logo":null,"courtesyLine":null,"slidingMsg":null,"percDiscount":0,"percAddon":0,"drawerPulse":2,"ecrNum":1,"intInvoice":true,"invoice2Lines":false,"invoiceSubtotal":false,"invoiceClientCheck":false,"fidelity":false,"pcsOperatorPrint":false,"kbdPrebill":null,"periodCheck":null,"printECRNum":false,"singleQuantity":false,"printUnitPrice":false,"showChange":false,"mandSubtotal":null,"cutter":true,"midnightAlert":false,"creditNote":true,"creditNoteProgressive":0,"cashDeclaration":false,"printBuffer":false,"departmentNet":false,"appendixCut":true,"vatVentilation":false,"printLastReceiptFromDGFE":false,"invoiceProgressive":1,"receiptLimit":99999999,"xmlSendSchedule":{"enabled":false,"hours":74,"minutes":40,"startHour":50,"endHour":30,"standBy":10},"invoiceText":[{"id":1,"name":"Assolve gli obblighi di cui all\'articolo 62,","enabled":false},{"id":2,"name":"comma 1, del decreto legge 24 gennaio 2012,","enabled":false},{"id":3,"name":"n. 1, convertito, con modificazioni, dalla","enabled":false},{"id":4,"name":"legge 24 marzo 2012, n. 27","enabled":false},{"id":5,"name":"","enabled":false},{"id":6,"name":"","enabled":false}],"departments":[{"id":1,"name":"REPARTO 01","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":2,"name":"REPARTO 02","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":3,"name":"REPARTO 03","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":4,"name":"REPARTO 04","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":5,"name":"REPARTO 05","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":6,"name":"REPARTO 06","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":7,"name":"REPARTO 07","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":8,"name":"REPARTO 08","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":9,"name":"REPARTO 09","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":10,"name":"REPARTO 10","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":11,"name":"REPARTO 11","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":12,"name":"REPARTO 12","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":13,"name":"REPARTO 13","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":14,"name":"REPARTO 14","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":15,"name":"REPARTO 15","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":16,"name":"REPARTO 16","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":17,"name":"REPARTO 17","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":18,"name":"REPARTO 18","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":19,"name":"REPARTO 19","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":20,"name":"REPARTO 20","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":21,"name":"REPARTO 21","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":22,"name":"REPARTO 22","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":23,"name":"REPARTO 23","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":24,"name":"REPARTO 24","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":25,"name":"REPARTO 25","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":26,"name":"REPARTO 26","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":27,"name":"REPARTO 27","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":28,"name":"REPARTO 28","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":29,"name":"REPARTO 29","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":30,"name":"REPARTO 30","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":31,"name":"REPARTO 31","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":32,"name":"REPARTO 32","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":33,"name":"REPARTO 33","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":34,"name":"REPARTO 34","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":35,"name":"REPARTO 35","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":36,"name":"REPARTO 36","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":37,"name":"REPARTO 37","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":38,"name":"REPARTO 38","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":39,"name":"REPARTO 39","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":40,"name":"REPARTO 40","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":41,"name":"REPARTO 41","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":42,"name":"REPARTO 42","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":43,"name":"REPARTO 43","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":44,"name":"REPARTO 44","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":45,"name":"REPARTO 45","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":46,"name":"REPARTO 46","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":47,"name":"REPARTO 47","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":48,"name":"REPARTO 48","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":49,"name":"REPARTO 49","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":50,"name":"REPARTO 50","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":51,"name":"REPARTO 51","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":52,"name":"REPARTO 52","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":53,"name":"REPARTO 53","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":54,"name":"REPARTO 54","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":55,"name":"REPARTO 55","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":56,"name":"REPARTO 56","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":57,"name":"REPARTO 57","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":58,"name":"REPARTO 58","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":59,"name":"REPARTO 59","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":60,"name":"REPARTO 60","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":61,"name":"REPARTO 61","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":62,"name":"REPARTO 62","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":63,"name":"REPARTO 63","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":64,"name":"REPARTO 64","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":65,"name":"REPARTO 65","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":66,"name":"REPARTO 66","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":67,"name":"REPARTO 67","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":68,"name":"REPARTO 68","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":69,"name":"REPARTO 69","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":70,"name":"REPARTO 70","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":71,"name":"REPARTO 71","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":72,"name":"REPARTO 72","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":73,"name":"REPARTO 73","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":74,"name":"REPARTO 74","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":75,"name":"REPARTO 75","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":76,"name":"REPARTO 76","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":77,"name":"REPARTO 77","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":78,"name":"REPARTO 78","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":79,"name":"REPARTO 79","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":80,"name":"REPARTO 80","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":81,"name":"REPARTO 81","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":82,"name":"REPARTO 82","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":83,"name":"REPARTO 83","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":84,"name":"REPARTO 84","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":85,"name":"REPARTO 85","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":86,"name":"REPARTO 86","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":87,"name":"REPARTO 87","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":88,"name":"REPARTO 88","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":89,"name":"REPARTO 89","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":90,"name":"REPARTO 90","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":91,"name":"REPARTO 91","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":92,"name":"REPARTO 92","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":93,"name":"REPARTO 93","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":94,"name":"REPARTO 94","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":95,"name":"REPARTO 95","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":96,"name":"REPARTO 96","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":97,"name":"REPARTO 97","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":98,"name":"REPARTO 98","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":99,"name":"REPARTO 99","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0}],"vats":[{"id":0,"type":"ES","ateco":"000000","value":4},{"id":1,"type":"VAT","ateco":"000000","value":0},{"id":2,"type":"VAT","ateco":"000000","value":0},{"id":3,"type":"VAT","ateco":"000000","value":0},{"id":4,"type":"VAT","ateco":"000000","value":0},{"id":5,"type":"VAT","ateco":"000000","value":0},{"id":6,"type":"VAT","ateco":"000000","value":0},{"id":7,"type":"VAT","ateco":"000000","value":0},{"id":8,"type":"EE","ateco":"000000","value":1},{"id":9,"type":"NS","ateco":"000000","value":2},{"id":10,"type":"NI","ateco":"000000","value":3},{"id":11,"type":"RM","ateco":"000000","value":5},{"id":12,"type":"AL","ateco":"000000","value":6},{"id":13,"type":"VAT","ateco":"000000","value":0},{"id":14,"type":"VAT","ateco":"000000","value":0},{"id":15,"type":"VAT","ateco":"000000","value":0},{"id":16,"type":"VAT","ateco":"000000","value":0},{"id":17,"type":"VAT","ateco":"000000","value":0},{"id":18,"type":"VAT","ateco":"000000","value":0},{"id":19,"type":"VAT","ateco":"000000","value":0},{"id":20,"type":"VAT","ateco":"000000","value":0},{"id":21,"type":"VAT","ateco":"000000","value":0},{"id":22,"type":"VAT","ateco":"000000","value":0},{"id":23,"type":"VAT","ateco":"000000","value":0},{"id":24,"type":"VAT","ateco":"000000","value":0},{"id":25,"type":"VAT","ateco":"000000","value":0},{"id":26,"type":"VAT","ateco":"000000","value":0},{"id":27,"type":"VAT","ateco":"000000","value":0},{"id":28,"type":"VAT","ateco":"000000","value":0},{"id":29,"type":"VAT","ateco":"000000","value":0},{"id":30,"type":"VAT","ateco":"000000","value":0},{"id":31,"type":"VAT","ateco":"000000","value":0},{"id":32,"type":"VAT","ateco":"000000","value":0},{"id":33,"type":"VAT","ateco":"000000","value":0},{"id":34,"type":"VAT","ateco":"000000","value":0},{"id":35,"type":"VAT","ateco":"000000","value":0},{"id":36,"type":"VAT","ateco":"000000","value":0},{"id":37,"type":"VAT","ateco":"000000","value":0},{"id":38,"type":"VAT","ateco":"000000","value":0},{"id":39,"type":"VAT","ateco":"000000","value":0}],"operators":[{"id":1,"name":""},{"id":2,"name":""},{"id":3,"name":""},{"id":4,"name":""},{"id":5,"name":""},{"id":6,"name":""},{"id":7,"name":""},{"id":8,"name":""},{"id":9,"name":""},{"id":10,"name":""},{"id":11,"name":""},{"id":12,"name":""},{"id":13,"name":""},{"id":14,"name":""},{"id":15,"name":""},{"id":16,"name":""},{"id":17,"name":""},{"id":18,"name":""},{"id":19,"name":""},{"id":20,"name":""},{"id":21,"name":""},{"id":22,"name":""},{"id":23,"name":""},{"id":24,"name":""},{"id":25,"name":""},{"id":26,"name":""},{"id":27,"name":""},{"id":28,"name":""},{"id":29,"name":""},{"id":30,"name":""},{"id":31,"name":""},{"id":32,"name":""},{"id":33,"name":""},{"id":34,"name":""},{"id":35,"name":""},{"id":36,"name":""},{"id":37,"name":""},{"id":38,"name":""},{"id":39,"name":""},{"id":40,"name":""},{"id":41,"name":""},{"id":42,"name":""},{"id":43,"name":""},{"id":44,"name":""},{"id":45,"name":""},{"id":46,"name":""},{"id":47,"name":""},{"id":48,"name":""},{"id":49,"name":""},{"id":50,"name":""},{"id":51,"name":""},{"id":52,"name":""},{"id":53,"name":""},{"id":54,"name":""},{"id":55,"name":""},{"id":56,"name":""},{"id":57,"name":""},{"id":58,"name":""},{"id":59,"name":""},{"id":60,"name":""},{"id":61,"name":""},{"id":62,"name":""},{"id":63,"name":""},{"id":64,"name":""},{"id":65,"name":""},{"id":66,"name":""},{"id":67,"name":""},{"id":68,"name":""},{"id":69,"name":""},{"id":70,"name":""},{"id":71,"name":""},{"id":72,"name":""},{"id":73,"name":""},{"id":74,"name":""},{"id":75,"name":""},{"id":76,"name":""},{"id":77,"name":""},{"id":78,"name":""},{"id":79,"name":""},{"id":80,"name":""},{"id":81,"name":""},{"id":82,"name":""},{"id":83,"name":""},{"id":84,"name":""},{"id":85,"name":""},{"id":86,"name":""},{"id":87,"name":""},{"id":88,"name":""},{"id":89,"name":""},{"id":90,"name":""},{"id":91,"name":""},{"id":92,"name":""},{"id":93,"name":""},{"id":94,"name":""},{"id":95,"name":""},{"id":96,"name":""},{"id":97,"name":""},{"id":98,"name":""},{"id":99,"name":""}],"payments":[{"id":1,"name":"CONTANTI","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":2,"name":"NON RISCOSSO BENI","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":1},{"id":3,"name":"ASSEGNI","change":false,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":4,"name":"CARTE DI CREDITO","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":5,"name":"TICKETS","change":false,"cash":false,"credit":true,"drawer":false,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":6,"name":"NON RISCOSSO SERVIZI","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":2},{"id":7,"name":"NON RISCOSSO FATTURE","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":3},{"id":8,"name":"NON RISCOSSO DCR SSN","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":4},{"id":9,"name":"SCONTO A PAGARE","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":0},{"id":10,"name":"BUONI MULTIUSO","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":0},{"id":11,"name":"BUONI CELIACHIA","change":false,"cash":false,"credit":true,"drawer":false,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":12,"name":"PAGAMENTO 12","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":13,"name":"PAGAMENTO 13","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":14,"name":"PAGAMENTO 14","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":15,"name":"PAGAMENTO 15","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":16,"name":"PAGAMENTO 16","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":17,"name":"PAGAMENTO 17","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":18,"name":"PAGAMENTO 18","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":19,"name":"PAGAMENTO 19","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":20,"name":"PAGAMENTO 20","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":21,"name":"PAGAMENTO 21","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":22,"name":"PAGAMENTO 22","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":23,"name":"PAGAMENTO 23","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":24,"name":"PAGAMENTO 24","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":25,"name":"PAGAMENTO 25","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":26,"name":"PAGAMENTO 26","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":27,"name":"PAGAMENTO 27","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":28,"name":"PAGAMENTO 28","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":29,"name":"PAGAMENTO 29","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":30,"name":"PAGAMENTO 30","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0}],"groups":[{"id":1,"name":"GRUPPO 01"},{"id":2,"name":"GRUPPO 02"},{"id":3,"name":"GRUPPO 03"},{"id":4,"name":"GRUPPO 04"},{"id":5,"name":"GRUPPO 05"},{"id":6,"name":"GRUPPO 06"},{"id":7,"name":"GRUPPO 07"},{"id":8,"name":"GRUPPO 08"},{"id":9,"name":"GRUPPO 09"},{"id":10,"name":"GRUPPO 10"}],"courtesyLines":[{"id":1,"name":""},{"id":2,"name":""}],"headings":[{"id":1,"name":""},{"id":2,"name":""},{"id":3,"name":""},{"id":4,"name":""},{"id":5,"name":""},{"id":6,"name":""},{"id":7,"name":""},{"id":8,"name":""},{"id":9,"name":""},{"id":10,"name":""},{"id":11,"name":""},{"id":12,"name":""},{"id":13,"name":""}]}';

	/**
	 * LDP33 type defaults
	 * @date 1/11/2022 - 2:16:10 PM
	 *
	 * @type {string}
	 */
	LDP33_PROG: string =
		'{"statDepartment":null,"statVat":null,"statHour":null,"statClerk":null,"statFinancial":null,"statGrpDetail":null,"statGrpTot":null,"logo":[{"id":0,"value":0},{"id":1,"value":0}],"courtesyLine":null,"slidingMsg":null,"percDiscount":0,"percAddon":0,"drawerPulse":20,"ecrNum":0,"intInvoice":null,"invoice2Lines":null,"invoiceSubtotal":null,"invoiceClientCheck":null,"fidelity":null,"pcsOperatorPrint":null,"kbdPrebill":null,"periodCheck":null,"printECRNum":null,"singleQuantity":null,"printUnitPrice":null,"showChange":null,"mandSubtotal":null,"cutter":null,"midnightAlert":null,"creditNote":null,"creditNoteProgressive":0,"cashDeclaration":null,"printBuffer":null,"departmentNet":null,"appendixCut":null,"vatVentilation":false,"printLastReceiptFromDGFE":null,"invoiceProgressive":0,"receiptLimit":0,"xmlSendSchedule":null,"invoiceText":null,"departments":[{"id":1,"name":"REPARTO1","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":2,"name":"REPARTO2","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":3,"name":"REPARTO3","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":4,"name":"REPARTO4","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":5,"name":"REPARTO5","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":6,"name":"REPARTO6","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":7,"name":"REPARTO7","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":8,"name":"REPARTO8","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":9,"name":"REPARTO9","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":10,"name":"REPARTO10","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0}],"vats":[{"id":0,"type":"ES","ateco":"0","value":4},{"id":1,"type":"VAT","ateco":"0","value":0},{"id":2,"type":"VAT","ateco":"0","value":0},{"id":3,"type":"VAT","ateco":"0","value":0},{"id":4,"type":"VAT","ateco":"0","value":0},{"id":5,"type":"VAT","ateco":"0","value":0},{"id":6,"type":"VAT","ateco":"0","value":0},{"id":7,"type":"VAT","ateco":"0","value":0},{"id":8,"type":"EE","ateco":"0","value":1},{"id":9,"type":"NS","ateco":"0","value":2},{"id":10,"type":"NI","ateco":"0","value":3},{"id":11,"type":"RM","ateco":"0","value":5},{"id":12,"type":"AL","ateco":"0","value":6}],"operators":[{"id":1,"name":""},{"id":2,"name":""},{"id":3,"name":""},{"id":4,"name":""}],"payments":[{"id":1,"name":"CONTANTI","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":2,"name":"NON RISCOSSO BENI","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":1},{"id":3,"name":"ASSEGNI","change":false,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":4,"name":"C.DI CREDITO","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":true,"payDiscount":false,"creditType":0},{"id":5,"name":"TICKETS","change":false,"cash":false,"credit":false,"drawer":true,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":6,"name":"NON RISCOSSO SERVIZI","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":2},{"id":7,"name":"NON RISCOSSO FATTURE","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":3},{"id":8,"name":"NON RISCOSSO DCR SSN","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":4},{"id":9,"name":"SCONTO A PAGARE","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":5},{"id":10,"name":"BUONI MULTIUSO","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":5},{"id":11,"name":"BUONI CELIACHIA","change":false,"cash":false,"credit":false,"drawer":true,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0}],"groups":null,"courtesyLines":null,"headings":null}';

	/**
	 * ONDA type defaults
	 * @date 1/11/2022 - 2:16:32 PM
	 *
	 * @type {string}
	 */
	ONDA_PROG: string =
		'{"statDepartment":null,"statVat":null,"statHour":null,"statClerk":null,"statFinancial":null,"statGrpDetail":null,"statGrpTot":null,"logo":[{"id":0,"value":0},{"id":1,"value":0}],"courtesyLine":null,"slidingMsg":null,"percDiscount":0,"percAddon":0,"drawerPulse":20,"ecrNum":0,"intInvoice":null,"invoice2Lines":null,"invoiceSubtotal":null,"invoiceClientCheck":null,"fidelity":null,"pcsOperatorPrint":null,"kbdPrebill":null,"periodCheck":null,"printECRNum":null,"singleQuantity":null,"printUnitPrice":null,"showChange":null,"mandSubtotal":null,"cutter":null,"midnightAlert":null,"creditNote":null,"creditNoteProgressive":0,"cashDeclaration":null,"printBuffer":null,"departmentNet":null,"appendixCut":null,"vatVentilation":false,"printLastReceiptFromDGFE":null,"invoiceProgressive":0,"receiptLimit":0,"xmlSendSchedule":null,"invoiceText":null,"departments":[{"id":1,"name":"REPARTO1","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":2,"name":"REPARTO2","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":3,"name":"REPARTO3","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":4,"name":"REPARTO4","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":5,"name":"REPARTO5","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":6,"name":"REPARTO6","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":7,"name":"REPARTO7","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":8,"name":"REPARTO8","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":9,"name":"REPARTO9","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":10,"name":"REPARTO10","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":11,"name":"REPARTO11","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":12,"name":"REPARTO12","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":13,"name":"REPARTO13","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":14,"name":"REPARTO14","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":15,"name":"REPARTO15","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":16,"name":"REPARTO16","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":17,"name":"REPARTO17","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":18,"name":"REPARTO18","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":19,"name":"REPARTO19","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0},{"id":20,"name":"REPARTO20","departmentType":0,"price":0,"halo":0,"lalo":1,"single":false,"vatCode":0,"groupCode":0}],"vats":[{"id":0,"type":"ES","ateco":"0","value":4},{"id":1,"type":"VAT","ateco":"0","value":0},{"id":2,"type":"VAT","ateco":"0","value":0},{"id":3,"type":"VAT","ateco":"0","value":0},{"id":4,"type":"VAT","ateco":"0","value":0},{"id":5,"type":"VAT","ateco":"0","value":0},{"id":6,"type":"VAT","ateco":"0","value":0},{"id":7,"type":"VAT","ateco":"0","value":0},{"id":8,"type":"EE","ateco":"0","value":1},{"id":9,"type":"NS","ateco":"0","value":2},{"id":10,"type":"NI","ateco":"0","value":3},{"id":11,"type":"RM","ateco":"0","value":5},{"id":12,"type":"AL","ateco":"0","value":6}],"operators":[{"id":1,"name":""},{"id":2,"name":""},{"id":3,"name":""},{"id":4,"name":""}],"payments":[{"id":1,"name":"CONTANTI","change":true,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":2,"name":" NON RISC BENI  ","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":1},{"id":3,"name":"ASSEGNI","change":false,"cash":true,"credit":false,"drawer":true,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":4,"name":"C.DI CREDITO","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":true,"payDiscount":false,"creditType":0},{"id":5,"name":"TICKETS","change":false,"cash":false,"credit":false,"drawer":true,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0},{"id":6,"name":"NON RISC SERVIZI","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":2},{"id":7,"name":"NON RISC FATTURE","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":3},{"id":8,"name":"NON RISC DCRaSSN","change":false,"cash":false,"credit":true,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":false,"creditType":4},{"id":9,"name":"SCONTO A PAGARE ","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":5},{"id":10,"name":"BUONI MULTIUSO","change":false,"cash":false,"credit":false,"drawer":false,"ticket":false,"inputTotalAmount":false,"payDiscount":true,"creditType":5},{"id":11,"name":"BUONI CELIACHIA","change":false,"cash":false,"credit":false,"drawer":true,"ticket":true,"inputTotalAmount":false,"payDiscount":false,"creditType":0}],"groups":null,"courtesyLines":null,"headings":null}';

	/**
	 * Creates an instance of RchDefault.
	 * @date 1/11/2022 - 2:16:45 PM
	 *
	 * @constructor
	 */
	constructor() {
		this.deviceCapabilities.push({
			type: DeviceType.PRINTF,
			fwVersion: '8.0.8',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 99,
			nVats: 40,
			nOperators: 99,
			nPayments: 30,
			defaultProg: JSON.parse(this.PRINTF_PROG),
		});

		this.deviceCapabilities.push({
			type: DeviceType.LDP33RT,
			fwVersion: '7.0.1',
			isDefault: true,
			hasProgDump: false,
			hasDgfeFreeSpace: false,
			nDepartments: 10,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.LDP33_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDART,
			fwVersion: '7.0.1',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDARTA,
			fwVersion: '7.0.1',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.SPOTRT,
			fwVersion: '7.0.1',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});

		this.deviceCapabilities.push({
			type: DeviceType.LDP33RT,
			fwVersion: '7.0.2',
			isDefault: true,
			hasProgDump: false,
			hasDgfeFreeSpace: false,
			nDepartments: 10,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.LDP33_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDART,
			fwVersion: '7.0.2',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDARTA,
			fwVersion: '7.0.2',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.SPOTRT,
			fwVersion: '7.0.2',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: false,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});

		this.deviceCapabilities.push({
			type: DeviceType.LDP33RT,
			fwVersion: '7.0.3',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 10,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.LDP33_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDART,
			fwVersion: '7.0.3',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.ONDARTA,
			fwVersion: '7.0.3',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});
		this.deviceCapabilities.push({
			type: DeviceType.SPOTRT,
			fwVersion: '7.0.3',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 20,
			nVats: 13,
			nOperators: 4,
			nPayments: 10,
			defaultProg: JSON.parse(this.ONDA_PROG),
		});

		this.deviceCapabilities.push({
			type: DeviceType.ABOX,
			fwVersion: '',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 99,
			nVats: 40,
			nOperators: 99,
			nPayments: 30,
			defaultProg: null,
		});
		this.deviceCapabilities.push({
			type: DeviceType.WALLE8T,
			fwVersion: '',
			isDefault: true,
			hasProgDump: true,
			hasDgfeFreeSpace: true,
			nDepartments: 99,
			nVats: 40,
			nOperators: 99,
			nPayments: 30,
			defaultProg: null,
		});
	}

	/**
	 * Get the default Prog by Device Type and Firmware version
	 * @date 1/11/2022 - 2:16:50 PM
	 *
	 * @param {DeviceType} deviceType
	 * @param {string} fwVersion
	 * @returns {(IProg | null)}
	 */
	getProgByDevice(deviceType: DeviceType, fwVersion: string): IProg | null {
		var prog: IProg = new Prog();

		var dc = this.getDeviceCapability(deviceType, fwVersion);

		if (dc) {
			if (dc.defaultProg != null) {
				prog = dc.defaultProg;
			} else {
				for (var i = 1; i <= dc.nDepartments; i++) {
					prog.departments.push({
						departmentType: 0,
						groupCode: 0,
						halo: 10000,
						lalo: 1,
						id: i,
						name: 'REPARTO ' + i,
						price: 100,
						single: false,
						vatCode: 0,
					});
				}
				for (var i = 1; i <= dc.nPayments; i++) {
					prog.payments.push({
						id: i,
						name: 'PAGAMENTO ' + i,
						cash: true,
						drawer: false,
					} as IPayment);
				}
				for (var i = 0; i < dc.nVats; i++) {
					prog.vats.push({id: i, ateco: '', type: 'VAT', value: 2200});
				}
				for (var i = 1; i <= dc.nOperators; i++) {
					prog.operators.push({
						id: i,
						name: i == dc.nOperators ? 'KEYBOARD' : '',
					});
				}
			}
		}
		return prog;
	}

	/**
	 * Get Device Capability by Device type and Firmware version
	 * @date 1/11/2022 - 2:17:14 PM
	 *
	 * @param { DeviceType } deviceType
	 * @param {string} fwVersion
	 * @returns {(DeviceCapabilites | undefined)}
	 */
	getDeviceCapability(
		deviceType: DeviceType,
		fwVersion: string
	): DeviceCapabilites | undefined {
		var capabilities = this.deviceCapabilities.filter(
			(d) => d.type == deviceType
		);

		var capabilityFwVersion = capabilities.find(
			(c) => c.fwVersion.toLowerCase == fwVersion.toLowerCase
		);

		return capabilityFwVersion ?? capabilities.find((c) => c.isDefault);
	}
}