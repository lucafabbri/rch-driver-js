/**
 * @author: Luca Fabbri <l.fabbri@rch.it>
 * @exports IDepartment
 */
export interface IDepartment {
  id: number;
  name: string;
  departmentType: number;
  price: number;
  halo: number;
  lalo: number;
  single: boolean;
  vatCode: number;
  groupCode: number;
}
