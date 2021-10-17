"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ingredient_1 = (0, tslib_1.__importDefault)(require("./ingredient"));
const recipe_1 = (0, tslib_1.__importDefault)(require("./recipe"));
let RecipeIngredient = class RecipeIngredient {
    id;
    recipeId;
    ingredientId;
    amount;
    position;
    recipe;
    ingredient;
};
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RecipeIngredient.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'recipe_id' }),
    (0, typeorm_1.Column)({ name: 'recipe_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], RecipeIngredient.prototype, "recipeId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'ingredient_id' }),
    (0, typeorm_1.Column)({ name: 'ingredient_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], RecipeIngredient.prototype, "ingredientId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)('float'),
    (0, tslib_1.__metadata)("design:type", Number)
], RecipeIngredient.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RecipeIngredient.prototype, "position", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => recipe_1.default),
    (0, typeorm_1.ManyToOne)(() => recipe_1.default, (recipe) => recipe.recipeIngredients, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'recipe_id' }),
    (0, tslib_1.__metadata)("design:type", recipe_1.default)
], RecipeIngredient.prototype, "recipe", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ingredient_1.default),
    (0, typeorm_1.ManyToOne)(() => ingredient_1.default, (ingredient) => ingredient.recipeIngredients, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ingredient_id' }),
    (0, tslib_1.__metadata)("design:type", ingredient_1.default)
], RecipeIngredient.prototype, "ingredient", void 0);
RecipeIngredient = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('recipe_ingredient'),
    (0, typeorm_1.Index)(['recipeId', 'ingredientId'], { unique: true }),
    (0, typeorm_1.Index)(['recipeId', 'position'], { unique: true })
], RecipeIngredient);
exports.default = RecipeIngredient;
