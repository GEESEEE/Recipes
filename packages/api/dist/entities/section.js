"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const recipe_1 = (0, tslib_1.__importDefault)(require("./recipe"));
const user_1 = (0, tslib_1.__importDefault)(require("./user"));
let Section = class Section {
};
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Section.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 255 }),
    (0, tslib_1.__metadata)("design:type", String)
], Section.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 1024 }),
    (0, tslib_1.__metadata)("design:type", String)
], Section.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'user_id' }),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Section.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_1.default),
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.sections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, tslib_1.__metadata)("design:type", user_1.default)
], Section.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => recipe_1.default, (recipe) => recipe.section),
    (0, tslib_1.__metadata)("design:type", Array)
], Section.prototype, "recipes", void 0);
Section = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('section')
], Section);
exports.default = Section;
