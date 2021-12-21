import { Driver } from "./Driver";

export class TcpIpDriver implements Driver {
    ETHIp: string;
    ETHPort: number | null;
}