"use strict";
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const inversify_express_utils_1 = require("inversify-express-utils");
const util_1 = require("../../util");
const inversify_1 = require("inversify");
const auth_1 = (0, tslib_1.__importStar)(require("../../services/auth"));
const errors_1 = require("../../errors");
const validation_1 = (0, tslib_1.__importDefault)(require("../../errors/validation"));
const { TYPES } = util_1.constants;
let AuthController = AuthController_1 = class AuthController {
    // #region Auth
    signUp(body) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.authService.signUp(body);
            }
            catch (err) {
                if (err instanceof validation_1.default) {
                    const property = err.data[0].property;
                    throw new errors_1.BadRequestError('Invalid ' +
                        property.charAt(0).toUpperCase() +
                        property.slice(1));
                }
                throw err;
            }
            if (result === auth_1.AuthError.USER_EXISTS) {
                throw new errors_1.ConflictError('Username already in use');
            }
            if (result === auth_1.AuthError.EMAIL_EXISTS) {
                throw new errors_1.ConflictError('Email already in use');
            }
            return { id: result.id };
        });
    }
    signIn() { }
    verifyToken(req) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return req.user;
        });
    }
    signOut(headers) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const token = headers.authorization.split(' ')[1];
            const result = yield this.authService.signOut(token);
            if (typeof result === 'boolean') {
                return result;
            }
            if (result === auth_1.OAuthError.INVALID_GRANT) {
                throw new errors_1.BadRequestError('Invalid Token');
            }
            throw new errors_1.BadRequestError('Invalid Signout');
        });
    }
    // #endregion
    // #region validate
    static validate(method) {
        switch (method) {
            case 'signUp':
                return [
                    (0, express_validator_1.body)('name').exists().isString(),
                    (0, express_validator_1.body)('password').exists().isString(),
                    (0, express_validator_1.body)('email').exists().isString(),
                ];
            case 'signOut':
                return [(0, express_validator_1.header)('authorization').exists().isString()];
            default:
                return [];
        }
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(TYPES.AuthService),
    (0, tslib_1.__metadata)("design:type", auth_1.default
    // #region Auth
    )
], AuthController.prototype, "authService", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/register', ...AuthController_1.validate('signUp'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/token', TYPES.TokenMiddleware),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/info', TYPES.PassportMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/revoke', TYPES.PassportMiddleware, ...AuthController_1.validate('signOut'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.requestHeaders)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
AuthController = AuthController_1 = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/v1/auth')
], AuthController);
exports.default = AuthController;
