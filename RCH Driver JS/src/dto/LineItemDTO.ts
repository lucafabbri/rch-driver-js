import { DiscountDTO } from "./DiscountDTO";

export interface LineItemDTO {
    quantity: number;
    price: number;
    description: string;
    departmentId: number;
    discount: DiscountDTO | null | undefined;
}