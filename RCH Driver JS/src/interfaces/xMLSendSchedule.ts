/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IXMLSendSchedule
 */
export interface IXMLSendSchedule {
  enabled: boolean;
  hours: number;
  minutes: number;
  startHour: number;
  endHour: number;
  standBy: number;
}
