import { LineItemDTO } from "./LineItemDTO";
import { PaymentItemDTO } from "./PaymentItemDTO";

export interface BillDTO {
    lineItems: LineItemDTO[];
    paymentItems: PaymentItemDTO[];
    lotteryCode: string | null | undefined;
}