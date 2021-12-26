#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crawler_1 = require("../network/Crawler");
console.log("Hello!");
Crawler_1.Crawler.networkGateway()
    .then((res) => {
    console.log(res);
})
    .catch((err) => {
    console.error(err);
});
Crawler_1.Crawler.ping_all()
    .then((res) => {
    console.log(res.length);
})
    .catch((err) => {
    console.error(err);
});
