/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IPayment
 */
export interface IPayment {
  id: number;
  name: string;
  change: boolean;
  cash: boolean;
  credit: boolean;
  drawer: boolean;
  ticket: boolean;
  inputTotalAmount: boolean;
  payDiscount: boolean;
  creditType: number;
}
