"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("../controllers");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const errors_1 = require("../errors");
const util_1 = require("../util");
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const hpp_1 = (0, tslib_1.__importDefault)(require("hpp"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const { TYPES } = util_1.constants;
function init(container) {
    return new inversify_express_utils_1.InversifyExpressServer(container)
        .setConfig((app) => {
        app.set('container', container);
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, helmet_1.default)());
        app.use((0, hpp_1.default)());
    })
        .setErrorConfig((app) => {
        const errorMiddleware = container.get(TYPES.ErrorMiddleware);
        app.use(() => {
            throw new errors_1.NotFoundError();
        });
        app.use((err, _req, res, _next) => {
            errorMiddleware.sendError(res, err.statusCode ?? err.status ?? 500, err.message ?? 'Internal Server Error');
        });
    })
        .build();
}
exports.default = init;
