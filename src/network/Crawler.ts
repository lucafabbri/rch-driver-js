import { EcrDevice } from "../EcrDevice";
import { IEcrDevice } from "../IEcrDevice";
import { ConnectionConst } from "../ConnectionConst";
import find, { IDevice } from 'local-devices';
var ping = require("ping");
var network = require("network");

export class Crawler{

    static networkGateway(): Promise<string> {
        return new Promise((resolve, reject) => {
            network.get_gateway_ip((err: any, ip: string) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(ip);
                }
            })
        })
    }

    static ping_all(): Promise<Array<IEcrDevice>> {
        return new Promise(async (resolve, reject) => {
            try {
                let gate_ip = await Crawler.networkGateway();
                let array = gate_ip.split('.');

                let results: Array<IEcrDevice> = []
                let promises: Array<Promise<any>> = []

                for (let i = 1; i < 255; i++) {
                    if (i != parseInt(array[3])) {
                        var host = array[0] + "." + array[1] + "." + array[2] + "." + i;
                        promises.push(ping.promise.probe(host));
                    }
                }

                let pingResults = await Promise.allSettled(promises);
                
                pingResults.forEach((res) => {
                    if (res.status == "fulfilled" && res.value.alive) {
                        let device = new EcrDevice();
                        device.ip = res.value.host;
                        device.connection = ConnectionConst.TCPIP;
                        results.push(device);
                    }
                })

                resolve(results);

            } catch (err) {
                reject(err);
            }

        })
    }

    static getLocalDevice(ipAddress: string): Promise<IDevice[]>{
        return find(ipAddress);
    }
}