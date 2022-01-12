import assert from 'assert';
import { BillDTO, BillType, DeviceType, RchProtocol } from '../dist/esm';
import { ConnectionConst } from '../dist/esm/ConnectionConst';

import { Driver } from '../dist/esm/Driver';
import { Core } from '../dist/esm/protocol/Core';

describe('#addCommandEventListener()', () => {
	var driver = new Driver();
	var rollback = driver.addCommandEventListener(() => {});
	it('it should add the command listner', () => {
		assert.ok(driver.commandEventListeners.length == 1);
	});
	it('it should remove the command listner', () => {
		rollback();
		assert.equal(driver.commandEventListeners.length, 0);
	});
});
describe('#formatCommandToByteArray()', () => {
	var driver = new Driver();
	var commandFormatted = driver.formatCommandToByteArray('=K');
	it('it should format the command', () => {
		assert.equal(commandFormatted, [
			2,
			48,
			49,
			48,
			48,
			50,
			78,
			61,
			75,
			48,
			51,
			57,
			3,
		]);
	});
});

describe('#open()', function () {
	this.timeout(5000);
	it('it should open tcp/ip connection with printer', async function () {
		var driver = new Driver();
		assert.ok(await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23}));
	});
});
describe('#close()', function () {
	this.timeout(5000);
	it('it should close tcp/ip connection with printer', async function () {
		var driver = new Driver();
		await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
		assert.ok(await driver.close());
	});
});
describe('#discover()', function () {
	this.timeout(60000 * 5);
	it('it should find RCH devices', async function () {
		try {
			var driver = new Driver();
			var result = await driver.discovery();
			assert.ok(result.length > 0);
		} catch (e) {
			assert.fail();
		}
	});
});
describe('#sendCommand()', function () {
	this.timeout(5000);
	it('it should send a command to the printer', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		var core = new Core();
		try {
			assert.ok(await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23}));
			var result = await driver.sendCommand(core.clear());
			assert.equal(result.response.length, 1);
			assert.ok(result.isSuccess);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#sendCommands()', function () {
	this.timeout(5000);
	it('it should send some commands to the printer', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		var core = new Core();
		try {
			assert.ok(await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23}));
			var result = await driver.sendCommands([
				core.prg(),
				core.V(0, 'EE',0,"620201"),
				core.reg(),
			]);
			assert.equal(result.length, 3);
			assert.ok(result[0].isSuccess);
			assert.ok(result[1].isSuccess);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#allProgramming()', function () {
	this.timeout(10000);
	it('it should get the printer programming', async function () {
		var driver = new Driver();
		//driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var result = await driver.allProgramming();
			console.log(result?.departments.filter(d => d.vatCode != 0));
			assert.ok(true);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#dumpDGFE()', function () {
	this.timeout(300000);
	it('it should get the printer DGFE dump', async function () {
		var driver = new Driver();
		//driver.addCommandEventListener((command: string) => console.log(command));
		try {
			if (await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23})) {
				var result = await driver.dumpDGFE(
					new Date(2021, 11, 1, 0, 0, 0, 0),
					new Date(2021, 11, 31, 0, 0, 0, 0)
				);
				result.receipts.forEach((c) => console.log(c));
				result.closures.forEach(c => console.log(c))
				assert.ok(result);
			} else {
				assert.fail('Driver not opened');
			}
		} catch (e) {
			console.error(e);
			assert.fail();
		}
		await driver.close();
	});
});
describe('#printReceipt()', function () {
	this.timeout(30000);
	it('it should print a bill', async function () {
		var driver = new Driver();
		//driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var result = await driver.printReceipt(
				{
					billType: BillType.RECEIPT,
					lineItems: [
						{
							price: 500,
							quantity: 2,
							description: 'MELE',
							departmentId: 1,
						},
						{
							price: 1000,
							quantity: 1,
							description: 'PERE',
							departmentId: 1,
						},
						{
							price: 1000,
							quantity: 1,
							description: 'SUCCO',
							departmentId: 2,
						},
						{
							price: 1500,
							quantity: 1,
							description: 'VINO',
							departmentId: 2,
							discount: {
								description: 'sconto',
								value: 500,
							},
						},
						{
							price: 1000,
							quantity: 2,
							description: 'MELE',
							departmentId: 3,
							discount: {
								description: 'sconto',
								percent: 50,
							},
						},
					],
					paymentItems: [
						{value: 2500, paymentId: 1},
						{value: 2500, paymentId: 2},
					],
					textBefore: ['before', 'test'],
					textAfter: ['test', 'after'],
				} as BillDTO,
				false,
				true
			);
			console.debug(result);
			assert.ok(result);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#cancelReceipt()', function () {
	this.timeout(30000);
	it('it should cancel a receipt', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var receipt = await driver.printReceipt(
				{
					billType: BillType.CANCEL,
					lineItems: [
						{
							price: 500,
							quantity: 2,
							description: 'MELE',
							departmentId: 1,
						},
					],
					paymentItems: [{value: 1000, paymentId: 1}],
				} as BillDTO,
				false,
				true
			);
			console.log(receipt.receipt);
			if (
				receipt.receipt?.date &&
				receipt.receipt?.closure &&
				receipt.receipt?.number
			) {
				var result = await driver.printReceipt({
					billType: BillType.CANCEL,
					returnInfo: {
						date: receipt.receipt?.date,
						closure: receipt.receipt?.closure,
						number: receipt.receipt?.number,
					},
					lineItems: [
						{
							price: 500,
							quantity: 2,
							description: 'MELE',
							departmentId: 1,
						},
					],
				} as BillDTO);
				console.log(result);
				assert.ok(result);
			} else {
				assert.fail('Error');
			}
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#returnReceipt()', function () {
	this.timeout(30000);
	it('it should return a receipt', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var receipt = await driver.printReceipt(
				{
					billType: BillType.RETURN,
					lineItems: [
						{
							price: 500,
							quantity: 2,
							description: 'MELE',
							departmentId: 1,
						},
					],
					paymentItems: [{value: 1000, paymentId: 1}],
				} as BillDTO,
				false,
				true
			);
			console.log(receipt.receipt);
			if (
				receipt.receipt?.date &&
				receipt.receipt?.closure &&
				receipt.receipt?.number
			) {
				var result = await driver.printReceipt({
					billType: BillType.RETURN,
					returnInfo: {
						date: receipt.receipt?.date,
						closure: receipt.receipt?.closure,
						number: receipt.receipt?.number,
					},
					lineItems: [
						{
							price: 500,
							quantity: 1,
							description: 'MELE',
							departmentId: 1,
						},
					],
				} as BillDTO);
				console.log(result);
				assert.ok(result);
			} else {
				assert.fail('Error');
			}
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#zReport()', function () {
	this.timeout(60000);
	it('it should print the Z report', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			assert.ok(await driver.zReport());
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#xReport()', function () {
	this.timeout(60000);
	it('it should print the X eport', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			assert.ok(await driver.xReport());
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#print()', function () {
	this.timeout(5000);
	it('it should print non fiscal', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			assert.ok(
				await driver.print([
					'UPC-E',
					'12345678|1',
					'EAN-13',
					'1234567891234|2',
					'EAN-8',
					'12345678|3',
					'CODE-39',
					'123456789123|4',
					'UPC-A',
					'123456789123|5',
					'ITF',
					'123456789123|6',
					'CODABAR',
					'123456789123|7',
					'CODE-128',
					'123456789123|8',
					'CODE-93',
					'123456789123|9',
					'UPC-E_UPC-A',
					'123456789123|10',
					'che storia||1',
					'che storia',
					'che storia|11',
				])
			);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#printerStatus()', function () {
	it('it should get the PrinterStatus', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var result = await driver.getPrinterStatus();
			console.log(result);
			assert.ok(result != null);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#deviceStatus()', function () {
	it('it should get the DeviceStatus', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: RchProtocol) => {
			console.log(command);
			console.log(command.areResponsesMatchingPacketId);
		});
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var result = await driver.getDeviceStatus();
			console.log(result);
			assert.ok(result != null);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#getCashRegisterData()', function () {
	this.timeout(10000);
	it('it should get the DeviceStatus', async function () {
		var driver = new Driver();
		driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var result = await driver.getCashRegisterData();
			console.log(result);
			assert.ok(result != null);
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});
describe('#buildProgCommands', function () {
	this.timeout(120000);
	it('it should buildProgCommands', async function () {
		var driver = new Driver();
		//driver.addCommandEventListener((command: string) => console.log(command));
		try {
			await driver.open({connection:ConnectionConst.TCPIP, ip:'192.168.1.10', ipPort: 23});
			var progs = await driver.allProgramming();
			if (progs) {
				var result = driver.buildProgCommands(progs, DeviceType.PRINTF, true);
				console.log("| DESCRIZIONE".padEnd(48, ' ') + ' | '+'COMANDO'.padEnd(75,' ')+" |");
				console.log("| ".padEnd(49, '-') + '|'+''.padEnd(78,'-'));
				result.forEach(c => {
					if (c.cmd) {
						console.log(
							('| '+c.description).padEnd(48, ' ') +
								' | ' +
								c.cmd.padEnd(75, ' ') +
								' |'
						);
					} else {
						console.log(
							('| ' + c.description).padEnd(48, ' ') +
								' | ' +
								(c.error ?? '').padEnd(75, ' ') +
								' |'
						);
					}
				});
				console.log('| '.padEnd(49, '-') + '|' + ''.padEnd(78, '-'));
				assert.ok(result != null);
			} else {
				assert.fail();
			}
		} catch (e) {
			assert.fail();
		}
		await driver.close();
	});
});

