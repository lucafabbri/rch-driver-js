"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidDevice = void 0;
const AbstractDevice_1 = require("./AbstractDevice");
class AndroidDevice extends AbstractDevice_1.AbstractDevice {
    constructor() {
        super(...arguments);
        this.androidId = "";
        this.swVersionLabel = "";
        this.swVersion = "";
        this.licenses = [];
    }
}
exports.AndroidDevice = AndroidDevice;
