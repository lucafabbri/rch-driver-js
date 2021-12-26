"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const TcpIpDriver_1 = require("../src/TcpIpDriver");
describe("Driver", () => {
    var driver = new TcpIpDriver_1.TcpIpDriver();
    describe("#addCommandEventListener()", () => {
        var rollback = driver.addCommandEventListener(() => { });
        it("it should add the command listner", () => {
            assert.ok(driver.commandEventListeners.length == 1);
        });
        it("it should remove the command listner", () => {
            rollback();
            assert.equal(driver.commandEventListeners.length, 0);
        });
    });
    describe("#addStatusEventListener()", () => {
        var rollback = driver.addStatusEventListener(() => { });
        it("it should add the status listner", () => {
            assert.ok(driver.statusEventListeners.length == 1);
        });
        it("it should remove the status listner", () => {
            rollback();
            assert.equal(driver.statusEventListeners.length, 0);
        });
    });
    describe("#formatCommandToByteArray()", () => {
        var commandFormatted = driver.formatCommandToByteArray("=K");
        it("it should format the command", () => {
            assert.equal(commandFormatted, [2, 48, 49, 48, 48, 50, 78, 61, 75, 48, 51, 57, 3]);
        });
    });
});
