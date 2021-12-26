"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLSendSchedule = void 0;
class XMLSendSchedule {
    constructor(entry) {
        this.enabled = entry.charAt(5) == '1';
        this.hours = parseInt(entry.substring(6, 2));
        this.minutes = parseInt(entry.substring(8, 2));
        this.startHour = parseInt(entry.substring(10, 2));
        this.endHour = parseInt(entry.substring(12, 2));
        this.standBy = parseInt(entry.substring(14, 2));
    }
}
exports.XMLSendSchedule = XMLSendSchedule;
