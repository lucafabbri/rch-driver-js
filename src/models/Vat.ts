import { IVat } from "../interfaces/vat"
import { AbstractParser } from "./AbstractParser"
export class Vat extends AbstractParser implements IVat{
    id: number;
    type: string;
    ateco: string;
    value: number;

    constructor(entry: string){
        super();
        this.id = parseInt(entry.substring(1, 3));
        this.value = parseInt(entry.substring(4, 4));
        let t = parseInt(entry.substring(8, 1));
        switch (t) {
            case 1:
                switch (this.value) {
                    case 1:
                        this.type = "EE";
                        break;
                    case 2:
                        this.type = "NS";
                        break;
                    case 3:
                        this.type = "NI";
                        break;
                    case 4:
                        this.type = "ES";
                        break;
                    case 5:
                        this.type = "RM";
                        break;
                    case 6:
                        this.type = "AL";
                        break;
                }
                break;
            case 2:
                this.type = "VI";
                break;
            case 0:
            default:
                this.type = "VAT";
                break;

        }
        this.ateco = entry.substring(9, 6);
    }
}