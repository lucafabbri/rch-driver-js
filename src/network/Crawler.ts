import { EcrDevice } from "../EcrDevice";
import { IEcrDevice } from "../IEcrDevice";
import { ConnectionConst } from "../ConnectionConst";
import find from 'local-devices';

/**
 * This class is a local Network Crawler to find devices on the local network
 * @date 1/11/2022 - 12:19:23 PM
 *
 * @export
 * @class Crawler
 * @typedef {Crawler}
 */
export class Crawler{
    private static logTag: string = "[Crawler]: "

    
    /**
     * Ping all the available device in the network and find potential IECRDevice candidates
     * @date 1/11/2022 - 12:19:58 PM
     *
     * @static
     * @async
     * @returns {Promise<Array<IEcrDevice>>}
     */
    static async ping_all(): Promise<Array<IEcrDevice>> {
        let results: Array<IEcrDevice> = []
        try {
            let pingResults = await find();
            console.debug(this.logTag + "Devices found on Local Network: "+pingResults.length);

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