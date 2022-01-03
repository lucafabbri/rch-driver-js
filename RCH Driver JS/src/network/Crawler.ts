import { EcrDevice } from "../EcrDevice";
import { IEcrDevice } from "../IEcrDevice";
import { ConnectionConst } from "../ConnectionConst";
import find, { IDevice } from 'local-devices';

export class Crawler{
    static logTag: string = "[Crawler]: "

    static async ping_all(): Promise<Array<IEcrDevice>> {
        let results: Array<IEcrDevice> = []
        try {
            let pingResults = await find();

            pingResults.forEach((res) => {
                let device = new EcrDevice();
                device.ip = res.ip;
                device.hostName = res.name;
                device.macAddress = res.mac;
                device.connection = ConnectionConst.TCPIP;
                results.push(device);
            });
        } catch (e) {
            console.error(this.logTag + e);
        }

        return results;
    }
}