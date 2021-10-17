"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const express_validator_1 = require("express-validator");
let ErrorMiddleware = class ErrorMiddleware extends inversify_express_utils_1.BaseMiddleware {
    async handler(req, res, next) {
        console.log('RequestBody', req.body);
        const errors = await (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        this.sendErrors(res, 422, errors
            .array({ onlyFirstError: true })
            .map(({ param, location, msg }) => ({
            param,
            location,
            message: msg,
        })));
    }
    sendError(res, statusCode, message) {
        this.sendErrors(res, statusCode, [{ message }]);
    }
    sendErrors(res, statusCode, errors) {
        console.log('errors', errors);
        res.status(statusCode).send({ errors });
    }
};
ErrorMiddleware = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], ErrorMiddleware);
exports.default = ErrorMiddleware;
