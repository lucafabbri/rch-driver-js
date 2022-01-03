/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IDocument
 */
export interface IDocument {
  rows: Array<String>;
  number: Number;
  closure: Number;
  isNotFiscal: Boolean;
  date: String;
}
