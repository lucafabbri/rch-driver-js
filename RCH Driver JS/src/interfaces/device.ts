import { IProg } from './prog';
/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IDevice
 */
export interface IDevice {
  hasProgDump: Boolean;
  hasDgfeFreeSpace: Boolean;
  nDepartments: Number;
  nVats: Number;
  nPayments: Number;
  nOperators: Number;
  serialNumber: String;
  type: String;
  connection: String;
  ip: String;
  ipPort: Number;
  comPort: String;
  baudRate: Number;
  hostName: String;
  macAddress: String;
  fwVersionLabel: String;
  fwVersion: String;
  active: Boolean;
  prog: IProg;
}
