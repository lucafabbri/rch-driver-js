"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const TcpIpDriver_1 = require("../dist/esm/TcpIpDriver");
const Core_1 = require("../dist/esm/protocol/Core");
describe("#addCommandEventListener()", () => {
    var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
    var rollback = driver.addCommandEventListener(() => { });
    it("it should add the command listner", () => {
        assert_1.default.ok(driver.commandEventListeners.length == 1);
    });
    it("it should remove the command listner", () => {
        rollback();
        assert_1.default.equal(driver.commandEventListeners.length, 0);
    });
});
describe("#formatCommandToByteArray()", () => {
    var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
    var commandFormatted = driver.formatCommandToByteArray("=K");
    it("it should format the command", () => {
        assert_1.default.equal(commandFormatted, [2, 48, 49, 48, 48, 50, 78, 61, 75, 48, 51, 57, 3]);
    });
});
describe("#open()", function () {
    this.timeout(5000);
    it('it should open tcp/ip connection with printer', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            assert_1.default.ok(yield driver.open());
        });
    });
});
describe("#close()", function () {
    this.timeout(5000);
    it('it should close tcp/ip connection with printer', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            yield driver.open();
            assert_1.default.ok(yield driver.close());
        });
    });
});
describe("#discover()", function () {
    this.timeout(180000);
    it("it should find RCH devices", function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var driver = new TcpIpDriver_1.TcpIpDriver(null, null);
                var result = yield driver.discovery();
                assert_1.default.ok(result.length > 0);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
        });
    });
});
describe("#sendCommand()", function () {
    this.timeout(5000);
    it('it should send a command to the printer', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            var core = new Core_1.Core();
            try {
                assert_1.default.ok(yield driver.open());
                var result = yield driver.sendCommand(core.clear());
                assert_1.default.equal(result.response.length, 1);
                assert_1.default.ok(result.isSuccess);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#sendCommands()", function () {
    this.timeout(5000);
    it('it should send some commands to the printer', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            var core = new Core_1.Core();
            try {
                assert_1.default.ok(yield driver.open());
                var result = yield driver.sendCommands([core.prg(), core.reg()]);
                assert_1.default.equal(result.length, 2);
                assert_1.default.ok(result[0].isSuccess);
                assert_1.default.ok(result[1].isSuccess);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#allProgramming()", function () {
    this.timeout(10000);
    it('it should get the printer programming', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                var result = yield driver.allProgramming();
                assert_1.default.ok(true);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#dumpDGFE()", function () {
    this.timeout(10000);
    it('it should get the printer DGFE dump', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                var result = yield driver.dumpDGFE("29122021");
                assert_1.default.ok(true);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#printReceipt()", function () {
    this.timeout(30000);
    it('it should print a bill', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                var result = yield driver.printReceipt({
                    lotteryCode: null,
                    lineItems: [
                        { price: 5000, quantity: 1, description: "MELE", departmentId: 1, discount: null }
                    ],
                    paymentItems: [
                        { value: 5000, description: "CONTANTI", paymentId: 1 }
                    ]
                });
                assert_1.default.ok(true);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#zReport()", function () {
    this.timeout(60000);
    it('it should print the Z report', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                assert_1.default.ok(yield driver.zReport());
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#xReport()", function () {
    this.timeout(60000);
    it('it should print the X eport', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                assert_1.default.ok(yield driver.zReport());
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#print()", function () {
    this.timeout(5000);
    it('it should print non fiscal', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                assert_1.default.ok(yield driver.print(["che storia"]));
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#printerStatus()", function () {
    it('it should get the PrinterStatus', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                var result = yield driver.printerStatus();
                console.log(result);
                assert_1.default.ok(result != null);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
describe("#deviceStatus()", function () {
    it('it should get the DeviceStatus', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var driver = new TcpIpDriver_1.TcpIpDriver("192.168.1.10", 23);
            driver.addCommandEventListener((command) => console.log(command));
            try {
                yield driver.open();
                var result = yield driver.deviceStatus();
                console.log(result);
                assert_1.default.ok(result != null);
            }
            catch (e) {
                assert_1.default.fail(e);
            }
            yield driver.close();
        });
    });
});
//# sourceMappingURL=DriverUnitTest.js.map