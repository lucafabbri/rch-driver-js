import assert from "assert";
import { ConnectionConst } from "../dist/esm/ConnectionConst";

import { Driver } from '../dist/esm/Driver';
import { Core } from '../dist/esm/protocol/Core';

describe("#addCommandEventListener()", () => {
    var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
    var rollback = driver.addCommandEventListener(() => { });
    it("it should add the command listner", () => {
        assert.ok(driver.commandEventListeners.length == 1);
    });
    it("it should remove the command listner", () => {
        rollback();
        assert.equal(driver.commandEventListeners.length, 0);
    });
});
describe("#formatCommandToByteArray()", () => {
    var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
    var commandFormatted = driver.formatCommandToByteArray("=K");
    it("it should format the command", () => {
        assert.equal(commandFormatted, [2, 48, 49, 48, 48, 50, 78, 61, 75, 48, 51, 57, 3]);
    });
});

describe("#open()", function () {
    this.timeout(5000);
    it('it should open tcp/ip connection with printer', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        assert.ok(await driver.open());
    })
});
describe("#close()", function () {
    this.timeout(5000);
    it('it should close tcp/ip connection with printer', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        await driver.open();
        assert.ok(await driver.close());
    })
});
describe("#discover()", function () {
    this.timeout(60000*5);
    it("it should find RCH devices", async function () {
        try {
            var driver = new Driver(ConnectionConst.TCPIP, null, null, null, null);
            var result = await driver.discovery();
            assert.ok(result.length > 0);
        } catch (e) {
            assert.fail(e);
        }
    });
});
describe("#sendCommand()", function () {
    this.timeout(5000);
    it('it should send a command to the printer', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        var core = new Core();
        try {
            assert.ok(await driver.open());
            var result = await driver.sendCommand(core.clear());
            assert.equal(result.response.length, 1);
            assert.ok(result.isSuccess);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#sendCommands()", function () {
    this.timeout(5000);
    it('it should send some commands to the printer', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        var core = new Core();
        try {
            assert.ok(await driver.open());
            var result = await driver.sendCommands([core.prg(), core.reg()]);
            assert.equal(result.length, 2);
            assert.ok(result[0].isSuccess);
            assert.ok(result[1].isSuccess);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#allProgramming()", function () {
    this.timeout(10000);
    it('it should get the printer programming', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            var result = await driver.allProgramming();
            assert.ok(true);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#dumpDGFE()", function () {
    this.timeout(60000);
    it('it should get the printer DGFE dump', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            var result = await driver.dumpDGFE(
							new Date(2021, 11, 1, 0, 0, 0, 0),
							new Date(2021, 11, 31, 0, 0, 0, 0)
            );
            console.log('Total COMMERCIALI: ' + result.receipts.length);
            console.log('Total CHIUSURE: ' + result.closures.length);
            console.log(result);
            assert.ok(true);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#printReceipt()", function () {
    this.timeout(30000);
    it('it should print a bill', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            var result = await driver.printReceipt(
							{
								lotteryCode: null,
								lineItems: [
									{
										price: 500,
										quantity: 2,
										description: 'MELE',
										departmentId: 1,
										discount: null,
									},
									{
										price: 1000,
										quantity: 1,
										description: 'PERE',
										departmentId: 1,
										discount: null,
									},
									{
										price: 1000,
										quantity: 1,
										description: 'SUCCO',
										departmentId: 2,
										discount: null,
									},
									{
										price: 1500,
										quantity: 1,
										description: 'VINO',
										departmentId: 2,
										discount: {
											description: 'sconto',
											value: 500,
											percent: null,
										},
									},
									{
										price: 1000,
										quantity: 2,
										description: 'MELE',
										departmentId: 3,
										discount: {
											description: 'sconto',
											value: null,
											percent: 50,
										},
									},
								],
								paymentItems: [
									{value: 2500, description: 'CONTANTI', paymentId: 1},
									{value: 2500, description: 'BANCOMAT', paymentId: 2},
								],
								textBefore: ['before', 'test'],
								textAfter: ['test', 'after'],
							},
							true
						);
            assert.ok(true);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#zReport()", function () {
    this.timeout(60000);
    it('it should print the Z report', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            assert.ok(await driver.zReport());
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#xReport()", function () {
    this.timeout(60000);
    it('it should print the X eport', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            assert.ok(await driver.xReport());
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#print()", function () {
    this.timeout(5000);
    it('it should print non fiscal', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            assert.ok(await driver.print(["che storia"]));
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#printerStatus()", function () {
    it('it should get the PrinterStatus', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            var result = await driver.getPrinterStatus();
            console.log(result);
            assert.ok(result != null);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe("#deviceStatus()", function () {
    it('it should get the DeviceStatus', async function () {
        var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
        driver.addCommandEventListener((command: string) => console.log(command));
        try {
            await driver.open();
            var result = await driver.getDeviceStatus();
            console.log(result);
            assert.ok(result != null);
        } catch (e) {
            assert.fail(e);
        }
        await driver.close();
    })
});
describe('#getCashRegisterData()', function () {
    this.timeout(10000);
	it('it should get the DeviceStatus', async function () {
		var driver = new Driver(ConnectionConst.TCPIP,"192.168.1.10", 23, null, null);
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open();
			var result = await driver.getCashRegisterData();
			console.log(result);
			assert.ok(result != null);
		} catch (e) {
			assert.fail(e);
		}
		await driver.close();
	});
});
