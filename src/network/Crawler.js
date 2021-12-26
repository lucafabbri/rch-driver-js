"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawler = void 0;
const EcrDevice_1 = require("../EcrDevice");
const ConnectionConst_1 = require("../ConnectionConst");
var ping = require("ping");
var network = require("network");
class Crawler {
    static networkGateway() {
        return new Promise((resolve, reject) => {
            network.get_gateway_ip((err, ip) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(ip);
                }
            });
        });
    }
    static ping_all() {
        return new Promise(async (resolve, reject) => {
            try {
                let gate_ip = await Crawler.networkGateway();
                let array = gate_ip.split('.');
                let results = [];
                let promises = [];
                for (let i = 1; i < 255; i++) {
                    if (i != parseInt(array[3])) {
                        var host = array[0] + "." + array[1] + "." + array[2] + "." + i;
                        promises.push(ping.promise.probe(host));
                    }
                }
                let pingResults = await Promise.allSettled(promises);
                pingResults.forEach((res) => {
                    if (res.status == "fulfilled" && res.value.alive) {
                        let device = new EcrDevice_1.EcrDevice();
                        device.ip = res.value.host;
                        device.connection = ConnectionConst_1.ConnectionConst.TCPIP;
                        results.push(device);
                    }
                });
                resolve(results);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getHostName(ipAddress) {
        //todo method stub
        return "";
    }
    getMacAddress(ipAddress) {
        //todo method stub
        return "";
    }
}
exports.Crawler = Crawler;
