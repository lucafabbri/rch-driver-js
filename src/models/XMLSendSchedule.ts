import { IXMLSendSchedule } from "../interfaces/xMLSendSchedule"
export class XMLSendSchedule implements IXMLSendSchedule {
    enabled: boolean;
    hours: number;
    minutes: number;
    startHour: number;
    endHour: number;
    standBy: number;

    constructor(entry: string){
        this.enabled = entry.charAt(5) == '1';
        this.hours = parseInt(entry.substring(6, 2));
        this.minutes = parseInt(entry.substring(8, 2));
        this.startHour = parseInt(entry.substring(10, 2));
        this.endHour = parseInt(entry.substring(12, 2));
        this.standBy = parseInt(entry.substring(14, 2));
    }
}