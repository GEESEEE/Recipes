"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const recipe_ingredient_1 = (0, tslib_1.__importDefault)(require("./recipe-ingredient"));
let Ingredient = class Ingredient {
    id;
    name;
    unit;
    recipeIngredients;
};
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Ingredient.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 255 }),
    (0, tslib_1.__metadata)("design:type", String)
], Ingredient.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], Ingredient.prototype, "unit", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => recipe_ingredient_1.default),
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_1.default, (recipeIngredient) => recipeIngredient.ingredient, { cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], Ingredient.prototype, "recipeIngredients", void 0);
Ingredient = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('ingredient'),
    (0, typeorm_1.Index)(['name', 'unit'], { unique: true })
], Ingredient);
exports.default = Ingredient;
