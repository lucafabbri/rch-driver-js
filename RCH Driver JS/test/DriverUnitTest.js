"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
const esm_1 = require("../dist/esm");
const ConnectionConst_1 = require("../dist/esm/ConnectionConst");
const Driver_1 = require("../dist/esm/Driver");
const Core_1 = require("../dist/esm/protocol/Core");
describe('#addCommandEventListener()', () => {
    var driver = new Driver_1.Driver();
    var rollback = driver.addCommandEventListener(() => { });
    it('it should add the command listner', () => {
        assert_1.default.ok(driver.commandEventListeners.length == 1);
    });
    it('it should remove the command listner', () => {
        rollback();
        assert_1.default.equal(driver.commandEventListeners.length, 0);
    });
});
describe('#formatCommandToByteArray()', () => {
    var driver = new Driver_1.Driver();
    var commandFormatted = driver.formatCommandToByteArray('=K');
    it('it should format the command', () => {
        assert_1.default.equal(commandFormatted, [
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
    it('it should open tcp/ip connection with printer', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            assert_1.default.ok(yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 }));
        });
    });
});
describe('#close()', function () {
    this.timeout(5000);
    it('it should close tcp/ip connection with printer', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
            assert_1.default.ok(yield driver.close());
        });
    });
});
describe('#discover()', function () {
    this.timeout(60000 * 5);
    it('it should find RCH devices', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                var driver = new Driver_1.Driver();
                var result = yield driver.discovery();
                assert_1.default.ok(result.length > 0);
            }
            catch (e) {
                assert_1.default.fail();
            }
        });
    });
});
describe('#sendCommand()', function () {
    this.timeout(5000);
    it('it should send a command to the printer', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            var core = new Core_1.Core();
            try {
                assert_1.default.ok(yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 }));
                var result = yield driver.sendCommand(core.clear());
                assert_1.default.equal(result.response.length, 1);
                assert_1.default.ok(result.isSuccess);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#sendCommands()', function () {
    this.timeout(5000);
    it('it should send some commands to the printer', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            var core = new Core_1.Core();
            try {
                assert_1.default.ok(yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 }));
                var result = yield driver.sendCommands([
                    core.prg(),
                    core.V(0, 'EE', 0, "620201"),
                    core.reg(),
                ]);
                assert_1.default.equal(result.length, 3);
                assert_1.default.ok(result[0].isSuccess);
                assert_1.default.ok(result[1].isSuccess);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#allProgramming()', function () {
    this.timeout(10000);
    it('it should get the printer programming', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            //driver.addCommandEventListener((command: string) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var result = yield driver.allProgramming();
                console.log(result === null || result === void 0 ? void 0 : result.departments.filter(d => d.vatCode != 0));
                assert_1.default.ok(true);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#dumpDGFE()', function () {
    this.timeout(300000);
    it('it should get the printer DGFE dump', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            //driver.addCommandEventListener((command: string) => console.log(command));
            try {
                if (yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 })) {
                    var result = yield driver.dumpDGFE(new Date(2021, 11, 1, 0, 0, 0, 0), new Date(2021, 11, 31, 0, 0, 0, 0));
                    result.receipts.forEach((c) => console.log(c));
                    result.closures.forEach(c => console.log(c));
                    assert_1.default.ok(result);
                }
                else {
                    assert_1.default.fail('Driver not opened');
                }
            }
            catch (e) {
                console.error(e);
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#printReceipt()', function () {
    this.timeout(30000);
    it('it should print a bill', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            //driver.addCommandEventListener((command: string) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var result = yield driver.printReceipt({
                    billType: esm_1.BillType.RECEIPT,
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
                        { value: 2500, paymentId: 1 },
                        { value: 2500, paymentId: 2 },
                    ],
                    textBefore: ['before', 'test'],
                    textAfter: ['test', 'after'],
                }, false, true);
                console.debug(result);
                assert_1.default.ok(result);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#cancelReceipt()', function () {
    this.timeout(30000);
    it('it should cancel a receipt', function () {
        var _a, _b, _c, _d, _e, _f;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var receipt = yield driver.printReceipt({
                    billType: esm_1.BillType.CANCEL,
                    lineItems: [
                        {
                            price: 500,
                            quantity: 2,
                            description: 'MELE',
                            departmentId: 1,
                        },
                    ],
                    paymentItems: [{ value: 1000, paymentId: 1 }],
                }, false, true);
                console.log(receipt.receipt);
                if (((_a = receipt.receipt) === null || _a === void 0 ? void 0 : _a.date) &&
                    ((_b = receipt.receipt) === null || _b === void 0 ? void 0 : _b.closure) &&
                    ((_c = receipt.receipt) === null || _c === void 0 ? void 0 : _c.number)) {
                    var result = yield driver.printReceipt({
                        billType: esm_1.BillType.CANCEL,
                        returnInfo: {
                            date: (_d = receipt.receipt) === null || _d === void 0 ? void 0 : _d.date,
                            closure: (_e = receipt.receipt) === null || _e === void 0 ? void 0 : _e.closure,
                            number: (_f = receipt.receipt) === null || _f === void 0 ? void 0 : _f.number,
                        },
                        lineItems: [
                            {
                                price: 500,
                                quantity: 2,
                                description: 'MELE',
                                departmentId: 1,
                            },
                        ],
                    });
                    console.log(result);
                    assert_1.default.ok(result);
                }
                else {
                    assert_1.default.fail('Error');
                }
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#returnReceipt()', function () {
    this.timeout(30000);
    it('it should return a receipt', function () {
        var _a, _b, _c, _d, _e, _f;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var receipt = yield driver.printReceipt({
                    billType: esm_1.BillType.RETURN,
                    lineItems: [
                        {
                            price: 500,
                            quantity: 2,
                            description: 'MELE',
                            departmentId: 1,
                        },
                    ],
                    paymentItems: [{ value: 1000, paymentId: 1 }],
                }, false, true);
                console.log(receipt.receipt);
                if (((_a = receipt.receipt) === null || _a === void 0 ? void 0 : _a.date) &&
                    ((_b = receipt.receipt) === null || _b === void 0 ? void 0 : _b.closure) &&
                    ((_c = receipt.receipt) === null || _c === void 0 ? void 0 : _c.number)) {
                    var result = yield driver.printReceipt({
                        billType: esm_1.BillType.RETURN,
                        returnInfo: {
                            date: (_d = receipt.receipt) === null || _d === void 0 ? void 0 : _d.date,
                            closure: (_e = receipt.receipt) === null || _e === void 0 ? void 0 : _e.closure,
                            number: (_f = receipt.receipt) === null || _f === void 0 ? void 0 : _f.number,
                        },
                        lineItems: [
                            {
                                price: 500,
                                quantity: 1,
                                description: 'MELE',
                                departmentId: 1,
                            },
                        ],
                    });
                    console.log(result);
                    assert_1.default.ok(result);
                }
                else {
                    assert_1.default.fail('Error');
                }
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#zReport()', function () {
    this.timeout(60000);
    it('it should print the Z report', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                assert_1.default.ok(yield driver.zReport());
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#xReport()', function () {
    this.timeout(60000);
    it('it should print the X eport', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                assert_1.default.ok(yield driver.xReport());
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#print()', function () {
    this.timeout(5000);
    it('it should print non fiscal', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                assert_1.default.ok(yield driver.print([
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
                ]));
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#printerStatus()', function () {
    it('it should get the PrinterStatus', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var result = yield driver.getPrinterStatus();
                console.log(result);
                assert_1.default.ok(result != null);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#deviceStatus()', function () {
    it('it should get the DeviceStatus', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => {
                console.log(command);
                console.log(command.areResponsesMatchingPacketId);
            });
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var result = yield driver.getDeviceStatus();
                console.log(result);
                assert_1.default.ok(result != null);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#getCashRegisterData()', function () {
    this.timeout(10000);
    it('it should get the DeviceStatus', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var result = yield driver.getCashRegisterData();
                console.log(result);
                assert_1.default.ok(result != null);
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
describe('#buildProgCommands', function () {
    this.timeout(120000);
    it('it should buildProgCommands', function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var driver = new Driver_1.Driver();
            //driver.addCommandEventListener((command: string) => console.log(command));
            try {
                yield driver.open({ connection: ConnectionConst_1.ConnectionConst.TCPIP, ip: '192.168.1.10', ipPort: 23 });
                var progs = yield driver.allProgramming();
                if (progs) {
                    var result = driver.buildProgCommands(progs, esm_1.DeviceType.PRINTF, true);
                    console.log("| DESCRIZIONE".padEnd(48, ' ') + ' | ' + 'COMANDO'.padEnd(75, ' ') + " |");
                    console.log("| ".padEnd(49, '-') + '|' + ''.padEnd(78, '-'));
                    result.forEach(c => {
                        var _a;
                        if (c.cmd) {
                            console.log(('| ' + c.description).padEnd(48, ' ') +
                                ' | ' +
                                c.cmd.padEnd(75, ' ') +
                                ' |');
                        }
                        else {
                            console.log(('| ' + c.description).padEnd(48, ' ') +
                                ' | ' +
                                ((_a = c.error) !== null && _a !== void 0 ? _a : '').padEnd(75, ' ') +
                                ' |');
                        }
                    });
                    console.log('| '.padEnd(49, '-') + '|' + ''.padEnd(78, '-'));
                    assert_1.default.ok(result != null);
                }
                else {
                    assert_1.default.fail();
                }
            }
            catch (e) {
                assert_1.default.fail();
            }
            yield driver.close();
        });
    });
});
//# sourceMappingURL=DriverUnitTest.js.map