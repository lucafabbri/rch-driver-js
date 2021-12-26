"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Crawler_1 = require("../src/network/Crawler");
describe("Crawler", function () {
    describe("#networkGateway()", () => {
        it("should get default getaway ip", async () => {
            try {
                var result = await Crawler_1.Crawler.networkGateway();
                assert.ok(result == "192.168.1.1");
            }
            catch (err) {
                assert.fail(false, err);
            }
        });
    });
    describe("#ping_all()", function () {
        it("should ping all ip in the network and find some devices", async () => {
            try {
                var result = await Crawler_1.Crawler.ping_all();
                console.log(result);
                assert.ok(result.length > 0, JSON.stringify(result));
                assert.ok(result[0].ip == "192.168.1.81", JSON.stringify(result[0]));
            }
            catch (err) {
                assert.fail(false, err);
            }
        });
    });
});
