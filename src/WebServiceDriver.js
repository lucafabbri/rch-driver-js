"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceDriver = void 0;
const Driver_1 = require("./Driver");
class WebServiceDriver extends Driver_1.Driver {
    constructor() {
        super(...arguments);
        this.URL = "http://192.168.1.10";
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
exports.WebServiceDriver = WebServiceDriver;
