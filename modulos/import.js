"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var xwing = {
    name: "X-wing",
    pilot: "Luke",
    speed: 50,
    weapons: 4
};
console.log(lodash.camelCase(xwing.pilot));
