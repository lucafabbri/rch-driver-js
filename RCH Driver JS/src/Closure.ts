import {Document} from './Document';

export class Closure extends Document {
	sells: number | undefined;
	grandTotal: number | undefined;
	invoices: number | undefined;
	invoicesTotal: number | undefined;
	fiscalDocuments: number | undefined;
	managementDocuments: number | undefined;
	summaryReadings: number | undefined;
	restores: number | undefined;
	dgfeNumber: number | undefined;
  fiscalSeal: string | undefined;
}
