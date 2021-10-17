"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
exports.default = BaseError;
