"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const constants_1 = require("../util/constants");
let UserService = class UserService {
    getUser(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = (yield this.userRepository.findOne({
                where: { id },
                relations: ['settings'],
            }));
            user.password = '';
            return user;
        });
    }
    getSettings(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return (yield this.settingsRepository.findOne({ id }));
        });
    }
    updateSettings(settings) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.settingsRepository.save(settings);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.UserRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], UserService.prototype, "userRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.SettingsRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], UserService.prototype, "settingsRepository", void 0);
UserService = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], UserService);
exports.default = UserService;
