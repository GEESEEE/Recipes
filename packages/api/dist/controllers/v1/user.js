"use strict";
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const entities_1 = require("../../entities");
const express_validator_1 = require("express-validator");
const inversify_express_utils_1 = require("inversify-express-utils");
const util_1 = require("../../util");
const constants_1 = require("../../util/constants");
const inversify_1 = require("inversify");
const services_1 = require("../../services");
const errors_1 = require("../../errors");
const { TYPES } = util_1.constants;
let UserController = UserController_1 = class UserController {
    getUser(req) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return req.user;
        });
    }
    // #region Settings
    getSettings(req) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const settingsId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.settingsId;
            return yield this.userService.getSettings(settingsId);
        });
    }
    updateSettings(req, body) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const colorRegex = /^#[0-9A-F]{6}$/i;
            if (typeof body.color !== 'undefined' &&
                body.color.match(colorRegex) == null) {
                throw new errors_1.BadRequestError('Invalid color');
            }
            const settings = Object.assign({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.settingsId }, body);
            return yield this.userService.updateSettings(settings);
        });
    }
    // #endregion
    // #region Sections
    validateSection(userId, sectionId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const section = yield this.sectionsService.getSection(sectionId);
            if (typeof section === 'undefined') {
                return {
                    id: sectionId,
                    statusCode: 404,
                    statusMessage: 'Provided sectionId was not found'
                };
            }
            if (section.userId !== userId) {
                return {
                    id: sectionId,
                    statusCode: 403,
                    statusMessage: 'Provided section does not belong to the requesting user'
                };
            }
            return section;
        });
    }
    createSection(req, body) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const section = Object.assign(Object.assign({}, body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
            return (yield this.sectionsService.createSections([section]))[0];
        });
    }
    getSections(req) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.sectionsService.getSectionsFromUser((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        });
    }
    updateSection(req, sectionId, body) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const validationResult = yield this.validateSection((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, sectionId);
            if (validationResult instanceof entities_1.Section) {
                return yield this.sectionsService.updateSection(validationResult, body);
            }
            return validationResult;
        });
    }
    deleteSection(req, sectionId) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const validationResult = yield this.validateSection((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, sectionId);
            if (validationResult instanceof entities_1.Section) {
                return yield this.sectionsService.deleteSection(sectionId);
            }
            return validationResult;
        });
    }
    // //#endregion
    // #region validate
    static validate(method) {
        switch (method) {
            case 'getUser':
                return [];
            case 'getSettings':
                return [];
            case 'updateSettings':
                return [
                    (0, express_validator_1.body)('theme').optional().isIn(Object.values(constants_1.ThemeType)),
                    (0, express_validator_1.body)('color').optional().isString(),
                    (0, express_validator_1.body)('invertedColors').optional().isBoolean(),
                ];
            case 'createSection': return [
                (0, express_validator_1.body)('name').exists().isString(),
                (0, express_validator_1.body)('description').exists().isString(),
            ];
            case 'getSections': return [];
            case 'updateSection': return [
                (0, express_validator_1.param)('sectionId').isInt().toInt(),
                (0, express_validator_1.body)('name').optional().isString(),
                (0, express_validator_1.body)('description').optional().isString(),
            ];
            case 'deleteSection': return [
                (0, express_validator_1.param)('sectionId').isInt().toInt(),
            ];
            default:
                return [];
        }
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(TYPES.UserService),
    (0, tslib_1.__metadata)("design:type", services_1.UserService)
], UserController.prototype, "userService", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(TYPES.SectionService),
    (0, tslib_1.__metadata)("design:type", services_1.SectionService)
], UserController.prototype, "sectionsService", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/', TYPES.PassportMiddleware, ...UserController_1.validate('getUser'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "getUser", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/settings', TYPES.PassportMiddleware, ...UserController_1.validate('getSettings'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "getSettings", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPut)('/settings', TYPES.PassportMiddleware, ...UserController_1.validate('updateSettings'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "updateSettings", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/sections', TYPES.PassportMiddleware, ...UserController_1.validate('createSection'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "createSection", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/sections', TYPES.PassportMiddleware, ...UserController_1.validate('getSections'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "getSections", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPut)('/sections/:sectionId', TYPES.PassportMiddleware, ...UserController_1.validate('updateSection'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('sectionId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "updateSection", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpDelete)('/sections/:sectionId', TYPES.PassportMiddleware, ...UserController_1.validate('deleteSection'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('sectionId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "deleteSection", null);
UserController = UserController_1 = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/v1/users')
], UserController);
exports.default = UserController;
