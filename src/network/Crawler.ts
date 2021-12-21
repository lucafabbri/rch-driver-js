import { EcrDevice } from "../EcrDevice";

export class Crawler{
    devices: Array<EcrDevice> = []

    ping_all(): Array<EcrDevice>{
        //todo method stub
        return this.devices;
    }

    getHostName(ipAddress: string): string{
        //todo method stub
        return ""
    }

    getMacAddress(ipAddress: string): string {
        //todo method stub
        return ""
    }

    
}