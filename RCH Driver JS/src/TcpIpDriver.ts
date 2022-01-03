import { Socket } from "net";
import { ComConst } from "./ComConst";
import { Driver } from "./Driver";
import { IEcrDevice } from "./IEcrDevice";
import { Crawler } from "./network/Crawler";
import { RchMessage } from "./protocol/RchMessage";
import { RchProtocol } from "./protocol/RchProtocol";

export class TcpIpDriver extends Driver {
    ip: string = "192.168.1.10";
    port: number = 23;
    client: Socket | null | undefined;
    logTag: string = "[TcpIpDriver]: "

    constructor(ip: string | null, port: number | null) {
        super();
        if (ip) {
            this.ip = ip;
        }
        if (port) {
            this.port = port;
        }
    }

    open(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client = new Socket();
            this.client.once("error", (error) => {
                console.error(error);
                reject(error);
                this.client = null;
            })
            var connectionResult = this.client.connect(this.port, this.ip, () => {
                this.client?.removeAllListeners("error")
                this.client?.on("error", (error) => {
                    console.error(error);
                    this.client = null;
                })
                resolve(true);
            })
        });
    }

    async discovery(): Promise<IEcrDevice[]> {
        var result: IEcrDevice[] = [];

        try {

            var devices = await Crawler.ping_all();
            for (var i = 0; i < devices.length; i++) {
                var device = devices[i];
                device.ipPort = 23;
                this.ip = device.ip;
                this.port = 23;
                try {
                    var d = await this.populateDevice(device);
                    if (d != null) {
                        console.debug(d);
                        result.push(d);
                    }
                } catch (pe) {
                    console.error(this.logTag + "#discovery " + pe);
                }
            }
        } catch (e) {
            console.error(this.logTag + "#discovery " + e);
        }

        return result;
    }
}