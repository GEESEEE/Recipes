"use strict";
var RecipeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const inversify_express_utils_1 = require("inversify-express-utils");
const services_1 = require("../../services");
const util_1 = require("../../util");
const inversify_1 = require("inversify");
const errors_1 = require("../../errors");
const request_1 = require("../../util/request");
const base_1 = require("./base");
const { TYPES } = util_1.constants;
const recipeProperties = ['ingredient', 'instruction'];
let RecipeController = RecipeController_1 = class RecipeController {
    recipeService;
    // #region Recipe
    async checkRecipeAbility(req, recipeId) {
        const ability = req.user?.ability;
        const action = base_1.methodMap[req.method];
        const recipe = await this.recipeService.getRecipe(recipeId);
        if (typeof recipe === 'undefined') {
            throw new errors_1.NotFoundError('Recipe not found');
        }
        if (!ability.can(action, recipe)) {
            let actionString = action;
            for (const prop of recipeProperties) {
                if (req.path.includes(prop)) {
                    actionString += ` ${prop}s`;
                    if (action === 'read') {
                        actionString += ' for';
                    }
                    else {
                        actionString += ' of';
                    }
                }
            }
            actionString += ' a';
            if (action === 'read')
                actionString += 'n unpublished';
            throw new errors_1.ForbiddenError(`Unauthorized to ${actionString} recipe from someone else`);
        }
        return recipe;
    }
    async createRecipe(req, body) {
        const recipe = {
            name: body.name,
            description: body.description,
            prepareTime: body.prepareTime,
            peopleCount: body.peopleCount,
            authorId: req.user?.id,
        };
        if (typeof body.publishedAt !== 'undefined') {
            recipe.publishedAt = body.publishedAt;
        }
        if (typeof body.createdAt !== 'undefined') {
            recipe.createdAt = body.createdAt;
        }
        if (typeof body.copyOf !== 'undefined') {
            recipe.copyOf = body.copyOf;
        }
        return (await this.recipeService.createRecipes([recipe]))[0];
    }
    async createRecipes(req, body) {
        const recipes = body.map((b) => {
            const r = {
                name: b.name,
                description: b.description,
                prepareTime: b.prepareTime,
                peopleCount: b.peopleCount,
                authorId: req.user?.id,
            };
            if (typeof b.publishedAt !== 'undefined') {
                r.publishedAt = b.publishedAt;
            }
            if (typeof b.createdAt !== 'undefined') {
                r.createdAt = b.createdAt;
            }
            if (typeof b.copyOf !== 'undefined') {
                r.copyOf = b.copyOf;
            }
            return r;
        });
        return await this.recipeService.createRecipes(recipes);
    }
    async getRecipe(req, recipeId) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        return recipe;
    }
    async getRecipes(req, body, scopes, search, sort) {
        if (typeof scopes === 'undefined') {
            scopes = [];
        }
        // If scope has author, but no authorId was provided, use the requesting user's id
        if (scopes.includes('author') && typeof body.authorId === 'undefined') {
            body.authorId = req.user?.id;
        }
        const args = body;
        if (typeof search !== 'undefined') {
            scopes.push('search');
            args.searchQuery = search;
        }
        if (typeof sort === 'undefined') {
            sort = [];
        }
        return await this.recipeService.getRecipesByScopes(scopes, args, sort);
    }
    async updateRecipe(req, recipeId, body) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        return await this.recipeService.updateRecipe(recipe, body);
    }
    async deleteRecipe(req, recipeId) {
        await this.checkRecipeAbility(req, recipeId);
        await this.recipeService.deleteRecipe(recipeId);
    }
    // #endregion
    // #region Ingredients
    async addIngredients(req, recipeId, body) {
        await this.checkRecipeAbility(req, recipeId);
        return await this.recipeService.addRecipeIngredients(recipeId, body);
    }
    async updateIngredients(req, recipeId, body) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        const res = [];
        const toUpdate = [];
        for (const iToUpdate of body) {
            const existIngr = recipe.recipeIngredients?.find((i) => i.id === iToUpdate.recipeIngredientId);
            if (typeof existIngr !== 'undefined') {
                toUpdate.push(iToUpdate);
            }
            else {
                res.push({
                    id: iToUpdate.recipeIngredientId,
                    statusCode: 403,
                    statusMessage: 'Provided recipeId does not match that of this recipe ingredient',
                });
            }
        }
        if (toUpdate.length > 0) {
            res.push(...(await this.recipeService.updateRecipeIngredients(toUpdate)));
        }
        return res;
    }
    async removeIngredients(req, recipeId, body) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        const toDelete = [];
        const errors = [];
        if (typeof recipe.recipeIngredients === 'undefined')
            recipe.recipeIngredients = [];
        for (const recipeIngredient of recipe.recipeIngredients) {
            if (typeof recipeIngredient.ingredient !== 'undefined' &&
                body.includes(recipeIngredient.ingredient.id)) {
                toDelete.push(recipeIngredient.ingredient.id);
            }
            else {
                errors.push({
                    id: recipeIngredient.id,
                    statusCode: 403,
                    statusMessage: 'Provided recipeId does not match that of this recipe ingredient',
                });
            }
        }
        if (toDelete.length > 0) {
            await this.recipeService.removeRecipeIngredients(recipeId, toDelete);
        }
        return errors;
    }
    // #endregion
    // #region Instructions
    async addInstructions(req, recipeId, body) {
        await this.checkRecipeAbility(req, recipeId);
        return await this.recipeService.addInstructions(recipeId, body);
    }
    async updateInstructions(req, recipeId, body) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        const res = [];
        const toUpdate = [];
        for (const iToUpdate of body) {
            const existInstr = recipe.instructions?.find((i) => i.id === iToUpdate.instructionId);
            if (typeof existInstr !== 'undefined') {
                toUpdate.push(iToUpdate);
            }
            else {
                res.push({
                    id: iToUpdate.instructionId,
                    statusCode: 403,
                    statusMessage: 'Provided recipeId does not match that of this instruction',
                });
            }
        }
        if (toUpdate.length > 0) {
            res.push(...(await this.recipeService.updateInstructions(toUpdate)));
        }
        return res;
    }
    async deleteInstructions(req, recipeId, body) {
        const recipe = await this.checkRecipeAbility(req, recipeId);
        const toDelete = [];
        const errors = [];
        if (typeof recipe.instructions === 'undefined')
            recipe.instructions = [];
        for (const instruction of recipe.instructions) {
            if (body.includes(instruction.id)) {
                toDelete.push(instruction.id);
            }
            else {
                errors.push({
                    id: instruction.id,
                    statusCode: 403,
                    statusMessage: 'Provided recipeId does not match that of this instruction',
                });
            }
        }
        if (toDelete.length > 0) {
            await this.recipeService.deleteInstructions(toDelete);
        }
        return errors;
    }
    // #endregion
    // #region validate
    static validate(method) {
        switch (method) {
            case 'createRecipes':
                return [
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*.name').exists().isString(),
                    (0, express_validator_1.body)('*.description').exists().isString(),
                    (0, express_validator_1.body)('*.prepareTime').isInt().toInt(),
                    (0, express_validator_1.body)('*.peopleCount').isInt().toInt(),
                ];
            case 'createRecipe':
                return [
                    (0, express_validator_1.body)('name').exists().isString(),
                    (0, express_validator_1.body)('description').exists().isString(),
                    (0, express_validator_1.body)('prepareTime').isInt().toInt(),
                    (0, express_validator_1.body)('peopleCount').isInt().toInt(),
                ];
            case 'deleteRecipe':
                return [(0, express_validator_1.param)('recipeId').isInt().toInt()];
            case 'getRecipe':
                return [(0, express_validator_1.param)('recipeId').isInt().toInt()];
            case 'getRecipes':
                return [
                    (0, express_validator_1.body)('authorId').optional().isString(),
                    (0, express_validator_1.query)('scopes').customSanitizer(request_1.decodeQueryParams),
                    (0, express_validator_1.query)('sort').customSanitizer(request_1.decodeSortQuery),
                    (0, express_validator_1.query)('search').customSanitizer(request_1.decodeQueryParams),
                ];
            case 'updateRecipe':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)('name').optional().isString(),
                    (0, express_validator_1.body)('description').optional().isString(),
                    (0, express_validator_1.body)('prepareTime').optional().isInt().toInt(),
                    (0, express_validator_1.body)('peopleCount').optional().isInt().toInt(),
                ];
            case 'addIngredients':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*.name').exists().isString(),
                    (0, express_validator_1.body)('*.position').isInt().toInt(),
                    (0, express_validator_1.body)('*.amount').isFloat().toFloat(),
                    (0, express_validator_1.body)('*.unit')
                        .isString()
                        .optional({ nullable: true, checkFalsy: false }),
                ];
            case 'removeIngredients':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*').isInt().toInt(),
                ];
            case 'updateIngredients':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*.recipeIngredientId').isInt().toInt(),
                    (0, express_validator_1.body)('*.amount').optional().isFloat().toFloat(),
                    (0, express_validator_1.body)('*.position').optional().isInt().toInt(),
                    (0, express_validator_1.body)('*.name').optional().isString(),
                    (0, express_validator_1.body)('*.unit').optional({ nullable: true }).isString(),
                ];
            case 'addInstructions':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*.text').exists().isString(),
                    (0, express_validator_1.body)('*.position').isInt().toInt(),
                ];
            case 'deleteInstructions':
                return [(0, express_validator_1.body)().isArray(), (0, express_validator_1.param)('*').isInt().toInt()];
            case 'updateInstructions':
                return [
                    (0, express_validator_1.param)('recipeId').isInt().toInt(),
                    (0, express_validator_1.body)().isArray(),
                    (0, express_validator_1.body)('*.instructionId').isInt().toInt(),
                    (0, express_validator_1.body)('*.text').exists().isString(),
                    (0, express_validator_1.body)('*.position').optional().isInt().toInt(),
                ];
            default:
                return [];
        }
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(TYPES.RecipeService),
    (0, tslib_1.__metadata)("design:type", services_1.RecipeService
    // #region Recipe
    )
], RecipeController.prototype, "recipeService", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/', TYPES.PassportMiddleware, ...RecipeController_1.validate('createRecipe'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('createRecipes'), TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "createRecipes", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/:recipeId', TYPES.PassportMiddleware, ...RecipeController_1.validate('getRecipe'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/', TYPES.PassportMiddleware, ...RecipeController_1.validate('getRecipes'), TYPES.ErrorMiddleware, TYPES.PaginationMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.queryParam)('scopes')),
    (0, tslib_1.__param)(3, (0, inversify_express_utils_1.queryParam)('search')),
    (0, tslib_1.__param)(4, (0, inversify_express_utils_1.queryParam)('sort')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object, Array, Array, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "getRecipes", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPut)('/:recipeId', TYPES.PassportMiddleware, ...RecipeController_1.validate('updateRecipe'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "updateRecipe", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpDelete)('/:recipeId', TYPES.PassportMiddleware, ...RecipeController_1.validate('deleteRecipe'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "deleteRecipe", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/:recipeId/ingredients/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('addIngredients'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "addIngredients", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPut)('/:recipeId/ingredients/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('updateIngredients'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "updateIngredients", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpDelete)('/:recipeId/ingredients/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('removeIngredients'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "removeIngredients", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPost)('/:recipeId/instructions/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('addInstructions'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "addInstructions", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpPut)('/:recipeId/instructions/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('updateInstructions'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "updateInstructions", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpDelete)('/:recipeId/instructions/bulk', TYPES.PassportMiddleware, ...RecipeController_1.validate('deleteInstructions'), TYPES.AbilityMiddleware, TYPES.ErrorMiddleware),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.request)()),
    (0, tslib_1.__param)(1, (0, inversify_express_utils_1.requestParam)('recipeId')),
    (0, tslib_1.__param)(2, (0, inversify_express_utils_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RecipeController.prototype, "deleteInstructions", null);
RecipeController = RecipeController_1 = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/v1/recipes')
], RecipeController);
exports.default = RecipeController;
