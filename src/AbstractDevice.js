"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDevice = void 0;
class AbstractDevice {
    constructor() {
        this.serialNumber = "";
        this.partNumber = "";
        this.type = "";
        this.connection = "";
        this.ip = "";
        this.ipPort = 23;
        this.comPort = "";
        this.baudRate = 9600;
        this.hostName = "";
        this.macAddress = "";
        this.active = true;
    }
}
exports.AbstractDevice = AbstractDevice;
