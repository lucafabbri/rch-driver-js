"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerialDriver = void 0;
const Driver_1 = require("./Driver");
class SerialDriver extends Driver_1.Driver {
    constructor() {
        super(...arguments);
        this.COMPort = "COM3";
        this.COMBaudRate = 9600;
    }
    close() {
        throw new Error("Method not implemented.");
    }
    open() {
        throw new Error("Method not implemented.");
    }
    sendCommand(command) {
        throw new Error("Method not implemented.");
    }
}
exports.SerialDriver = SerialDriver;
