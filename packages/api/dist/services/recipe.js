"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const constants_1 = require("../util/constants");
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
let RecipeService = class RecipeService {
    // #region ingredient
    createIngredient({ name, unit, }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let ingredient = yield this.ingredientRepository.findOne({
                where: { name, unit },
            });
            if (typeof ingredient === 'undefined') {
                ingredient = yield this.ingredientRepository.save({
                    name,
                    unit,
                });
            }
            return ingredient;
        });
    }
    deleteIngredient(ingredientId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.ingredientRepository.delete(ingredientId);
            return result.affected !== 0;
        });
    }
    getIngredient(ingredientId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const ingredient = yield this.ingredientRepository.findOne({
                where: { id: ingredientId },
            });
            return ingredient;
        });
    }
    // #endregion
    // #region Recipe
    createRecipes(recipes) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const rs = recipes.map((recipe) => this.recipeRepository.create(recipe));
            const recipe = yield this.recipeRepository.save(rs);
            return recipe;
        });
    }
    getRecipe(recipeId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return (yield this.recipeRepository
                .queryBuilder()
                .byId(recipeId)
                .finish()
                .getMany())[0];
        });
    }
    getRecipesByScopes(scopes, args, sort) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let qb = this.recipeRepository.queryBuilder(args);
            if (!qb.hasScopes(scopes)) {
                throw new errors_1.UnprocessableError('Invalid Scope');
            }
            const scopesWithoutArgs = qb.checkArgs(scopes);
            if (scopesWithoutArgs.length > 0) {
                throw new errors_1.UnprocessableError(`The following scopes have no arguments: ${scopesWithoutArgs.join(', ')}`);
            }
            qb = qb.applyScopes(scopes);
            if (!qb.hasSorts(sort)) {
                throw new errors_1.UnprocessableError('Invalid Sort');
            }
            qb = qb.applySorts(sort);
            return yield qb.finish().paginate();
        });
    }
    updateRecipe(recipe, { name, description, prepareTime, peopleCount, publishedAt, }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            recipe.name = name !== null && name !== void 0 ? name : recipe.name;
            recipe.description = description !== null && description !== void 0 ? description : recipe.description;
            recipe.prepareTime = prepareTime !== null && prepareTime !== void 0 ? prepareTime : recipe.prepareTime;
            recipe.peopleCount = peopleCount !== null && peopleCount !== void 0 ? peopleCount : recipe.peopleCount;
            if (typeof publishedAt !== 'undefined')
                recipe.publishedAt = publishedAt;
            return yield this.recipeRepository.save(recipe);
        });
    }
    deleteRecipe(recipeId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.recipeRepository.delete(recipeId);
            yield this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
            return result.affected !== 0;
        });
    }
    addIngredients(ingredients) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const existingIngredients = yield this.ingredientRepository.find({
                where: ingredients.map((ingr) => ({
                    name: ingr.name,
                    unit: ingr.unit,
                })),
            });
            // Filter out the ingredients which already exist
            const ingredientsToCreate = ingredients.filter((ingr) => {
                for (const existIngr of existingIngredients) {
                    if (existIngr.name === ingr.name &&
                        existIngr.unit === ingr.unit)
                        return false;
                }
                return true;
            });
            // If some ingredients do not exist yet, create them
            let newIngredients = [];
            if (ingredientsToCreate.length > 0) {
                newIngredients = yield this.ingredientRepository.save(ingredientsToCreate);
            }
            existingIngredients.push(...newIngredients);
            return existingIngredients;
        });
    }
    addRecipeIngredients(recipeId, ingredients) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const existingIngredients = yield this.addIngredients(ingredients.map((i) => ({ unit: i.unit, name: i.name })));
            const recipeIngredientObjects = existingIngredients.map((ingredient, index) => {
                return this.recipeIngredientRepository.create({
                    recipeId,
                    ingredient,
                    amount: ingredients[index].amount,
                    position: ingredients[index].position,
                });
            });
            return yield this.recipeIngredientRepository.save(recipeIngredientObjects);
        });
    }
    updateRecipeIngredients(recipeIngredients) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const existingRecipeIngredients = yield this.recipeIngredientRepository.find({
                where: {
                    id: (0, typeorm_1.In)(recipeIngredients.map((ri) => ri.recipeIngredientId)),
                },
                relations: ['ingredient'],
            });
            const ingredientUpdateObjects = {};
            recipeIngredients.forEach((ri) => {
                var _a, _b;
                if (typeof ri.name !== 'undefined' ||
                    typeof ri.unit !== 'undefined') {
                    const existRi = existingRecipeIngredients.find((exRi) => exRi.id === ri.recipeIngredientId);
                    if (typeof existRi !== 'undefined' &&
                        typeof existRi.ingredient !== 'undefined') {
                        ingredientUpdateObjects[ri.recipeIngredientId] = {
                            name: (_a = ri.name) !== null && _a !== void 0 ? _a : existRi.ingredient.name,
                            unit: (_b = ri.unit) !== null && _b !== void 0 ? _b : existRi.ingredient.unit,
                        };
                    }
                }
            });
            const updatedIngredients = yield this.addIngredients(Object.values(ingredientUpdateObjects));
            const recipeIngredientsToSave = existingRecipeIngredients.map((ri) => {
                // If ingredient was changed for this recipeIngredient, set it
                const updateObject = ingredientUpdateObjects[ri.id];
                if (typeof updateObject !== 'undefined') {
                    const ingredient = updatedIngredients.find((i) => i.name === updateObject.name &&
                        i.unit === updateObject.unit);
                    if (typeof ingredient !== 'undefined') {
                        ri.ingredient = ingredient;
                        ri.ingredientId = ingredient.id;
                    }
                }
                // If amount or position were given, set to recipeIngredient
                const recipeIngredient = recipeIngredients.find((i) => i.recipeIngredientId === ri.id);
                if (typeof recipeIngredient !== 'undefined') {
                    if (typeof recipeIngredient.amount !== 'undefined')
                        ri.amount = recipeIngredient.amount;
                    if (typeof recipeIngredient.position !== 'undefined')
                        ri.position = recipeIngredient.position;
                }
                return ri;
            });
            const newRecipeIngredients = yield this.recipeIngredientRepository.save(recipeIngredientsToSave);
            yield this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
            return newRecipeIngredients;
        });
    }
    removeRecipeIngredients(recipeId, ingredientIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.recipeIngredientRepository.delete({
                recipeId,
                ingredientId: (0, typeorm_1.In)(ingredientIds),
            });
            yield this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
        });
    }
    // #endregion
    // #region Instruction
    addInstructions(recipeId, instructions) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const instructionObjects = instructions.map((instruction) => this.instructionRepository.create({
                recipeId,
                text: instruction.text,
                position: instruction.position,
            }));
            return yield this.instructionRepository.save(instructionObjects);
        });
    }
    deleteInstructions(instructionIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.instructionRepository.delete(instructionIds);
        });
    }
    getInstructions(recipeId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const instructions = yield this.instructionRepository.find({
                where: { recipeId },
            });
            return instructions;
        });
    }
    updateInstructions(instructions) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const res = yield this.instructionRepository.save(instructions.map((i) => ({
                id: i.instructionId,
                text: i.text,
                position: i.position,
            })));
            return res;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.RecipeRepository),
    (0, tslib_1.__metadata)("design:type", repositories_1.RecipeRepository)
], RecipeService.prototype, "recipeRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.IngredientRepository),
    (0, tslib_1.__metadata)("design:type", repositories_1.IngredientRepository)
], RecipeService.prototype, "ingredientRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.RecipeIngredientRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], RecipeService.prototype, "recipeIngredientRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.InstructionRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], RecipeService.prototype, "instructionRepository", void 0);
RecipeService = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], RecipeService);
exports.default = RecipeService;
