"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const ComConst_1 = require("./ComConst");
class Driver {
    constructor() {
        this.commandEventListeners = [];
        this.statusEventListeners = [];
        this.packId = 0;
    }
    addCommandEventListener(listner) {
        this.commandEventListeners.push(listner);
        return () => {
            this.commandEventListeners.splice(this.commandEventListeners.indexOf(listner), 1);
        };
    }
    addStatusEventListener(listner) {
        this.statusEventListeners.push(listner);
        return () => {
            this.statusEventListeners.splice(this.statusEventListeners.indexOf(listner), 1);
        };
    }
    sendCommands(commands) {
        return new Promise((resolve, reject) => {
            var results = [];
            try {
                commands.forEach(async (command) => {
                    results.concat(await this.sendCommand(command));
                });
                resolve(results);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    formatCommandToByteArray(command) {
        var result = [];
        result.push(ComConst_1.ComConst.CHR_STX); //<STX>
        result.push(...Buffer.from("01")); //<ADDS>
        result.push(...Buffer.from(command.length.toString().padStart(3, '0'))); //<LUNGH>
        result.push(...Buffer.from(ComConst_1.ComConst.CHR_NUOVOPROTOCOLLO)); //<PROT-ID>
        result.push(...Buffer.from(command)); //<DATI>
        result.push(48 + this.packId); //<PACK-ID>
        result.push(...Buffer.from(this.calculateBcc(result).toString(16))); //<CHK>
        result.push(ComConst_1.ComConst.CHR_ETX); //<ETX>
        this.packId = this.packId > 9 ? 0 : this.packId + 1;
        return result;
    }
    calculateBcc(items) {
        var result = 0;
        items.forEach(n => {
            if (n != ComConst_1.ComConst.CHR_ETX) {
                if (n == ComConst_1.ComConst.CHR_STX) {
                    result = ComConst_1.ComConst.CHR_STX;
                }
                else {
                    result = result ^ n;
                }
            }
        });
        return result;
    }
    discovery() {
        throw new Error("Method not implemented.");
    }
    dumpDGFE(date) {
        throw new Error("Method not implemented.");
    }
    onCommand(buffer) {
        this.commandEventListeners.forEach(listner => listner(buffer));
    }
    onStatusUpdate(status) {
        this.statusEventListeners.forEach(listner => listner(status));
    }
}
exports.Driver = Driver;
