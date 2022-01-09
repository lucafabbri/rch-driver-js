import { ReceiptItemDiscount } from "./ReceiptItemDiscount";

export interface ReceiptItem{
	nature: string;
	qty: number;
	unitValue: number;
	discount: ReceiptItemDiscount;
  description: string;
  vat: number;
  value: number;
}