import { ILogo } from './logo';
import { ICourtesyLine } from './courtesyLine';
import { ISlidingMsg } from './slidingMsg';
import { IPeriodCheck } from './periodCheck';
import { IXMLSendSchedule } from './xMLSendSchedule';
import { IInvoiceText } from './invoiceText';
import { IDepartment } from './department';
import { IVat } from './vat';
import { IOperator } from './operator';
import { IPayment } from './payment';
import { IGroup } from './group';
import { IHeadingRow } from './headingRow';

/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IProg
 */

export interface IProg {
  statDepartment: boolean | null;
  statVat: boolean | null;
  statHour: boolean | null;
  statClerk: boolean | null;
  statFinancial: boolean | null;
  statGrpDetail: boolean | null;
  statGrpTot: boolean | null;
  logo: ILogo[];
  courtesyLine: ICourtesyLine[];
  slidingMsg: ISlidingMsg;
  percDiscount: number;
  percAddon: number;
  drawerPulse: number;
  eCRNum: number;
  intInvoice: boolean | null;
  invoice2Lines: boolean | null;
  invoiceSubtotal: boolean | null;
  invoiceClientCheck: boolean | null;
  fidelity: boolean | null;
  pcsOperatorPrint: boolean | null;
  kbdPrebill: boolean | null;
  periodCheck: IPeriodCheck;
  printECRNum: boolean | null;
  singleQuantity: boolean | null;
  printUnitPrice: boolean | null;
  showChange: boolean | null;
  mandSubtotal: boolean | null;
  cutter: boolean | null;
  midnightAlert: boolean | null;
  creditNote: boolean | null;
  creditNoteProgressive: number;
  cashDeclaration: boolean | null;
  printBuffer: boolean | null;
  departmentNet: boolean | null;
  appendixCut: boolean | null;
  vatVentilation: boolean | null;
  printLastReceiptFromDGFE: boolean | null;
  invoiceProgressive: number;
  receiptLimit: number;
  xMLSendSchedule: IXMLSendSchedule;
  invoiceText: IInvoiceText[];
  departments: IDepartment[];
  vats: IVat[];
  operators: IOperator[];
  payments: IPayment[];
  groups: IGroup[];
  courtesyLines: ICourtesyLine[];
  headings: IHeadingRow[];
}
