"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("express-async-errors");
require("reflect-metadata");
const loaders = (0, tslib_1.__importStar)(require("./loaders"));
exports.default = loaders.init();
