"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpIpDriver = void 0;
const Driver_1 = require("./Driver");
class TcpIpDriver extends Driver_1.Driver {
    constructor() {
        super(...arguments);
        this.ETHIp = "192.168.1.10";
        this.ETHPort = 23;
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
exports.TcpIpDriver = TcpIpDriver;
