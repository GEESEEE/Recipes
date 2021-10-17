"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../util/constants");
const _1 = require(".");
let Settings = class Settings {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Settings.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.ThemeType,
        default: constants_1.ThemeType.dark,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Settings.prototype, "theme", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Settings.prototype, "color", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'inverted_colors' }),
    (0, typeorm_1.Column)({ name: 'inverted_colors' }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Settings.prototype, "invertedColors", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.OneToOne)(() => _1.User, (user) => user.settings),
    (0, tslib_1.__metadata)("design:type", _1.User)
], Settings.prototype, "user", void 0);
Settings = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('settings')
], Settings);
exports.default = Settings;
