"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const constants_1 = require("../util/constants");
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
let RecipeService = class RecipeService {
    recipeRepository;
    ingredientRepository;
    recipeIngredientRepository;
    instructionRepository;
    // #region ingredient
    async createIngredient({ name, unit, }) {
        let ingredient = await this.ingredientRepository.findOne({
            where: { name, unit },
        });
        if (typeof ingredient === 'undefined') {
            ingredient = await this.ingredientRepository.save({
                name,
                unit,
            });
        }
        return ingredient;
    }
    async deleteIngredient(ingredientId) {
        const result = await this.ingredientRepository.delete(ingredientId);
        return result.affected !== 0;
    }
    async getIngredient(ingredientId) {
        const ingredient = await this.ingredientRepository.findOne({
            where: { id: ingredientId },
        });
        return ingredient;
    }
    // #endregion
    // #region Recipe
    async createRecipes(recipes) {
        const rs = recipes.map((recipe) => this.recipeRepository.create(recipe));
        const recipe = await this.recipeRepository.save(rs);
        return recipe;
    }
    async getRecipe(recipeId) {
        return (await this.recipeRepository
            .queryBuilder()
            .byId(recipeId)
            .finish()
            .getMany())[0];
    }
    async getRecipesByScopes(scopes, args, sort) {
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
        return await qb.finish().paginate();
    }
    async updateRecipe(recipe, { name, description, prepareTime, peopleCount, publishedAt, }) {
        recipe.name = name ?? recipe.name;
        recipe.description = description ?? recipe.description;
        recipe.prepareTime = prepareTime ?? recipe.prepareTime;
        recipe.peopleCount = peopleCount ?? recipe.peopleCount;
        if (typeof publishedAt !== 'undefined')
            recipe.publishedAt = publishedAt;
        return await this.recipeRepository.save(recipe);
    }
    async deleteRecipe(recipeId) {
        const result = await this.recipeRepository.delete(recipeId);
        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
        return result.affected !== 0;
    }
    async addIngredients(ingredients) {
        const existingIngredients = await this.ingredientRepository.find({
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
            newIngredients = await this.ingredientRepository.save(ingredientsToCreate);
        }
        existingIngredients.push(...newIngredients);
        return existingIngredients;
    }
    async addRecipeIngredients(recipeId, ingredients) {
        const existingIngredients = await this.addIngredients(ingredients.map((i) => ({ unit: i.unit, name: i.name })));
        const recipeIngredientObjects = existingIngredients.map((ingredient, index) => {
            return this.recipeIngredientRepository.create({
                recipeId,
                ingredient,
                amount: ingredients[index].amount,
                position: ingredients[index].position,
            });
        });
        return await this.recipeIngredientRepository.save(recipeIngredientObjects);
    }
    async updateRecipeIngredients(recipeIngredients) {
        const existingRecipeIngredients = await this.recipeIngredientRepository.find({
            where: {
                id: (0, typeorm_1.In)(recipeIngredients.map((ri) => ri.recipeIngredientId)),
            },
            relations: ['ingredient'],
        });
        const ingredientUpdateObjects = {};
        recipeIngredients.forEach((ri) => {
            if (typeof ri.name !== 'undefined' ||
                typeof ri.unit !== 'undefined') {
                const existRi = existingRecipeIngredients.find((exRi) => exRi.id === ri.recipeIngredientId);
                if (typeof existRi !== 'undefined' &&
                    typeof existRi.ingredient !== 'undefined') {
                    ingredientUpdateObjects[ri.recipeIngredientId] = {
                        name: ri.name ?? existRi.ingredient.name,
                        unit: ri.unit ?? existRi.ingredient.unit,
                    };
                }
            }
        });
        const updatedIngredients = await this.addIngredients(Object.values(ingredientUpdateObjects));
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
        const newRecipeIngredients = await this.recipeIngredientRepository.save(recipeIngredientsToSave);
        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
        return newRecipeIngredients;
    }
    async removeRecipeIngredients(recipeId, ingredientIds) {
        await this.recipeIngredientRepository.delete({
            recipeId,
            ingredientId: (0, typeorm_1.In)(ingredientIds),
        });
        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients();
    }
    // #endregion
    // #region Instruction
    async addInstructions(recipeId, instructions) {
        const instructionObjects = instructions.map((instruction) => this.instructionRepository.create({
            recipeId,
            text: instruction.text,
            position: instruction.position,
        }));
        return await this.instructionRepository.save(instructionObjects);
    }
    async deleteInstructions(instructionIds) {
        await this.instructionRepository.delete(instructionIds);
    }
    async getInstructions(recipeId) {
        const instructions = await this.instructionRepository.find({
            where: { recipeId },
        });
        return instructions;
    }
    async updateInstructions(instructions) {
        const res = await this.instructionRepository.save(instructions.map((i) => ({
            id: i.instructionId,
            text: i.text,
            position: i.position,
        })));
        return res;
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
