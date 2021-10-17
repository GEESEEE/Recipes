"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    data;
    constructor(data) {
        super('Validation Error');
        this.data = data;
    }
}
exports.default = ValidationError;
