"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const abilities_1 = (0, tslib_1.__importDefault)(require("../abilities"));
const errors_1 = require("../errors");
let AbilityMiddleware = class AbilityMiddleware extends inversify_express_utils_1.BaseMiddleware {
    async handler(req, _res, next) {
        if (typeof req.user === 'undefined') {
            throw new errors_1.NotFoundError('User not found');
        }
        req.user.ability = (0, abilities_1.default)(req.user);
        return next();
    }
};
AbilityMiddleware = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], AbilityMiddleware);
exports.default = AbilityMiddleware;
