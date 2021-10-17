"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = (0, tslib_1.__importDefault)(require("./base"));
class ConflictError extends base_1.default {
    constructor(message) {
        super(message ?? 'Not Found', 409);
    }
}
exports.default = ConflictError;