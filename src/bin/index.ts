#!/usr/bin/env node

import { Crawler } from "../network/Crawler";

console.log("Hello!");

Crawler.networkGateway()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });

Crawler.ping_all()
    .then((res) => {
        console.log(res.length);
    })
    .catch((err) => {
        console.error(err);
    });