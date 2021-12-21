import { Driver } from "./Driver";

export class SerialDriver implements Driver {
    COMPort: string;
    COMBaudRate: number;
}