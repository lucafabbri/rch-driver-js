import { Document } from "./Document";
import { ReceiptItem } from "./ReceiptItem";
import { ReceiptPayment } from "./ReceiptPayment";

export class Receipt extends Document {
	grandTotal: number | undefined;
	vatTotal: number | undefined;
  paymentTotal: number | undefined;
  items: ReceiptItem[] = [];
  payments: ReceiptPayment[] = []
}