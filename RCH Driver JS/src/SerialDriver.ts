import { Driver } from "./Driver";
import { IEcrDevice } from "./IEcrDevice";
import SerialPort from "serialport";
import { EcrDevice } from "./EcrDevice";

export class SerialDriver extends Driver {
	port: string | null | undefined = 'COM3';
	baudRate: number | null | undefined = 9600;
	client: SerialPort | null | undefined;

	constructor(port: string | null, baudRate: number | null) {
		super();
		this.port = port;
		this.baudRate = baudRate;
	}

	open(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this.port && this.baudRate) {
				this.client = new SerialPort(this.port, {
					baudRate: this.baudRate,
					autoOpen: false,
				});
				this.client.once('error', (error) => {
					console.error(error);
					reject(error);
					this.client = null;
				});
				this.client.once('open', () => {
					this.client?.removeAllListeners('error');
					this.client?.on('error', (error) => {
						console.error(error);
						this.client = null;
					});
					resolve(true);
				});
				this.client.open((err) => {
					console.error(err);
					this.client = null;
					reject(false);
				});
			} else {
				reject(false);
			}
		});
	}

	async discovery(): Promise<IEcrDevice[]> {
		var result: IEcrDevice[] = [];

		try {
			var ports = await SerialPort.list();
			for (var i = 0; i < ports.length; i++) {
				var port = ports[i];
				var device = new EcrDevice();
				device.baudRate = 9600;
				device.comPort = port.path;
				this.port = port.path;
				this.baudRate = 9600;
				try {
					var d = await this.populateDevice(device);
					if (d != null) {
						console.debug(d);
						result.push(d);
					}
				} catch (pe) {
					console.error(this.logTag + '#discovery ' + pe);
				}
			}
		} catch (e) {
			console.error(this.logTag + '#discovery ' + e);
		}

		return result;
	}
}