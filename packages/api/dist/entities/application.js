"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const token_1 = (0, tslib_1.__importDefault)(require("./token"));
let Application = class Application {
    id;
    uid;
    name;
    secret;
    redirectUri;
    confidential;
    scopes;
    tokens;
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Application.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Application.prototype, "uid", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 1023 }),
    (0, tslib_1.__metadata)("design:type", String)
], Application.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, tslib_1.__metadata)("design:type", String)
], Application.prototype, "secret", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'redirect_uri', length: 255 }),
    (0, class_validator_1.IsUrl)(),
    (0, tslib_1.__metadata)("design:type", String)
], Application.prototype, "redirectUri", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Application.prototype, "confidential", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 1023, default: '' }),
    (0, tslib_1.__metadata)("design:type", String)
], Application.prototype, "scopes", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => token_1.default, (token) => token.application),
    (0, tslib_1.__metadata)("design:type", Array)
], Application.prototype, "tokens", void 0);
Application = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('application')
], Application);
exports.default = Application;
