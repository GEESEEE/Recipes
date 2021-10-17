"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const recipe_1 = (0, tslib_1.__importDefault)(require("./recipe"));
let Instruction = class Instruction {
    id;
    text;
    position;
    recipeId;
    recipe;
};
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Instruction.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 255 }),
    (0, tslib_1.__metadata)("design:type", String)
], Instruction.prototype, "text", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Instruction.prototype, "position", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'recipe_id' }),
    (0, typeorm_1.Column)({ name: 'recipe_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Instruction.prototype, "recipeId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => recipe_1.default),
    (0, typeorm_1.ManyToOne)(() => recipe_1.default, (recipe) => recipe.instructions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'recipe_id',
    }),
    (0, tslib_1.__metadata)("design:type", recipe_1.default)
], Instruction.prototype, "recipe", void 0);
Instruction = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('instruction'),
    (0, typeorm_1.Index)(['recipeId', 'position'], { unique: true })
], Instruction);
exports.default = Instruction;
