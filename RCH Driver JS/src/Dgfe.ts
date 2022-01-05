import { Closure } from "./Closure";
import { Receipt } from "./Receipt";

export interface Dgfe{
  from: Date,
  to: Date,
  receipts: Receipt[];
  closures: Closure[];
}