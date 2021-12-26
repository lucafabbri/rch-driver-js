"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcrDevice = void 0;
const AbstractDevice_1 = require("./AbstractDevice");
class EcrDevice extends AbstractDevice_1.AbstractDevice {
    constructor() {
        super(...arguments);
        this.fwVersion = "";
        this.fwVersionLabel = "";
        this.hasProgDump = false;
        this.nDepartments = 0;
        this.nOperators = 0;
        this.nPayments = 0;
        this.nVats = 0;
        this.prog = null;
        this.hasDgfeFreeSpace = false;
    }
}
exports.EcrDevice = EcrDevice;
