"use strict";
var IngredientController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const services_1 = require("../../services");
const util_1 = require("../../util");
const errors_1 = require("../../errors");
const { TYPES } = util_1.constants;
let IngredientController = IngredientController_1 = class IngredientController {
    recipeService;
    async createIngredient(body) {
        return await this.recipeService.createIngredient(body);
    }
    async getIngredient(ingredientId) {
        const ingredient = await this.recipeService.getIngredient(ingredientId);
        if (typeof ingredient === 'undefined') {
            throw new errors_1.NotFoundError('Ingredient was not found');
        }
        return ingredient;
    }
    async deleteIngredient(ingredientId) {
        const result = await this.recipeService.deleteIngredient(ingredientId);
        if (!result) {
            throw new errors_1.NotFoundError('Ingredient was not found');
        }
    }
    static validate(method) {
        switch (method) {
            case 'createIngredient':
                return [
                    (0, express_validator_1.body)('name').exists().isString(),
                    (0, express_validator_1.body)('unit').optional().isString(),
                ];
            case 'getIngredient':
                return [(0, express_validator_1.param)('ingredientId').isInt().toInt()];
            case 'deleteIngredient':
                return [(0, express_validator_1.param)('ingredientId').isInt().toInt()];
            default:
                return [];
        }
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(TYPES.RecipeService),
    (0, tslib_1.__metadata)("design:type", services_1.RecipeService)
], IngredientController.prototype, "recipeService", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/', ...IngredientController_1.validate('createIngredient'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IngredientController.prototype, "createIngredient", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/:ingredientId', ...IngredientController_1.validate('getIngredient'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.requestParam)('ingredientId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IngredientController.prototype, "getIngredient", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpDelete)('/:ingredientId', ...IngredientController_1.validate('deleteIngredient'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.requestParam)('ingredientId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IngredientController.prototype, "deleteIngredient", null);
IngredientController = IngredientController_1 = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/v1/ingredients')
], IngredientController);
exports.default = IngredientController;
