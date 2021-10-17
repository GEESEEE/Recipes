"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const section_1 = (0, tslib_1.__importDefault)(require("./section"));
const settings_1 = (0, tslib_1.__importDefault)(require("./settings"));
const token_1 = (0, tslib_1.__importDefault)(require("./token"));
let User = class User {
    id;
    name;
    email;
    tokens;
    sections;
    password;
    settingsId;
    settings;
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], User.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.NotContains)(' '),
    (0, class_validator_1.IsAlphanumeric)(),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    (0, class_validator_1.IsEmail)(),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => token_1.default, (token) => token.user),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "tokens", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => section_1.default, (section) => section.user),
    (0, tslib_1.__metadata)("design:type", Array)
], User.prototype, "sections", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'settings_id' }),
    (0, typeorm_1.Column)({ name: 'settings_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], User.prototype, "settingsId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => settings_1.default),
    (0, typeorm_1.OneToOne)(() => settings_1.default, (settings) => settings.user),
    (0, typeorm_1.JoinColumn)({ name: 'settings_id' }),
    (0, tslib_1.__metadata)("design:type", settings_1.default)
], User.prototype, "settings", void 0);
User = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('user')
], User);
exports.default = User;
