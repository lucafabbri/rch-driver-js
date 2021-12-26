import { IPeriodCheck } from "../interfaces/periodCheck"
export class PeriodCheck implements IPeriodCheck{
    enabled: boolean = false;
    value: number = 0;
}