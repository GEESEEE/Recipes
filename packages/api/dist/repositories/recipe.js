"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeQueryBuilder = void 0;
const tslib_1 = require("tslib");
const base_1 = (0, tslib_1.__importStar)(require("./base"));
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
let RecipeRepository = class RecipeRepository extends base_1.default {
    queryBuilder(args) {
        return new RecipeQueryBuilder(this, this.createQueryBuilder('recipe'), args);
    }
    transform(record) {
        if (typeof record.instruction_id !== 'undefined') {
            record.instructions =
                record.instruction_id === null
                    ? []
                    : [
                        {
                            id: record.instruction_id,
                            text: record.instruction_text,
                            position: record.instruction_position,
                            recipe_id: record.instruction_recipe_id,
                        },
                    ];
        }
        if (typeof record.recipe_ingredient_id !== 'undefined' &&
            typeof record.ingredient_id !== 'undefined') {
            if (record.recipe_ingredient_id === null ||
                record.ingredient_id === null ||
                record.recipe_ingredient_ingredient_id !== record.ingredient_id) {
                record.recipeIngredients = [];
            }
            else {
                record.recipeIngredients = [
                    {
                        id: record.recipe_ingredient_id,
                        ingredient_id: record.recipe_ingredient_ingredient_id,
                        recipe_id: record.recipe_ingredient_recipe_id,
                        amount: record.recipe_ingredient_amount,
                        position: record.recipe_ingredient_position,
                        ingredient: {
                            id: record.ingredient_id,
                            name: record.ingredient_name,
                            unit: record.ingredient_unit,
                        },
                    },
                ];
            }
        }
        return super.transform(record);
    }
};
RecipeRepository = (0, tslib_1.__decorate)([
    (0, typeorm_1.EntityRepository)(entities_1.Recipe)
], RecipeRepository);
exports.default = RecipeRepository;
class RecipeQueryBuilder extends base_1.BaseQueryBuilder {
    scopes = {
        published: null,
        author: 'authorId',
        search: 'searchQuery',
    };
    sorts = {
        createtime: 'created_at',
        publishtime: 'published_at',
        preparetime: 'prepare_time',
        peoplecount: 'people_count',
        ingredientcount: 'COUNT(recipe_ingredient.id)',
        instructioncount: 'COUNT(instruction.id)',
    };
    authorId;
    searchQuery;
    makeBaseQuery() {
        return this.addSelect('recipe.*')
            .leftJoinAndSelect('instruction', 'instruction', 'instruction.recipe_id = recipe.id')
            .leftJoinAndSelect('recipe_ingredient', 'recipe_ingredient', 'recipe_ingredient.recipe_id = recipe.id')
            .leftJoinAndSelect('ingredient', 'ingredient', 'recipe_ingredient.ingredient_id = ingredient.id')
            .groupBy('recipe.id')
            .addGroupBy('instruction.id')
            .addGroupBy('recipe_ingredient.id')
            .addGroupBy('ingredient.id');
    }
    finish() {
        return this.addOrderBy('instruction.position', 'ASC').addOrderBy('recipe_ingredient.position', 'ASC');
    }
    get default() {
        return this.makeBaseQuery();
    }
    get published() {
        return this.makeBaseQuery().andWhere('recipe.published_at IS NOT NULL');
    }
    get author() {
        return this.makeBaseQuery().andWhere('recipe.authorId = :authorId', {
            authorId: this.authorId,
        });
    }
    get search() {
        if (typeof this.searchQuery === 'undefined')
            return this;
        const queries = this.searchQuery.map((q) => {
            const query = `'%${q}%'`;
            return `(${this.repository
                .createQueryBuilder('recipe')
                .select('recipe.id', 'id')
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where(`recipe.name ILIKE ${query}`)
                    .orWhere(`recipe.description ILIKE ${query}`)
                    .orWhere(`recipe.id IN (${this.repository
                    .createQueryBuilder('other_recipe')
                    .select('other_recipe.id', 'id')
                    .leftJoin('recipe_ingredient', 'recipe_ingredient', 'recipe_ingredient.recipe_id = other_recipe.id')
                    .leftJoin('ingredient', 'ingredient', 'recipe_ingredient.ingredient_id = ingredient.id')
                    .where(`ingredient.name ILIKE ${query}`)
                    .getSql()})`);
            }))
                .getSql()})`;
        });
        return this.andWhere(`recipe.id IN (${queries.join(' INTERSECT ')})`);
    }
    byId(recipeId) {
        return this.makeBaseQuery().andWhere('recipe.id = :recipeId', {
            recipeId,
        });
    }
    async deleteUncopiedRecipesFromAuthor(authorId) {
        const query = this.delete()
            .andWhere(`recipe.authorId = :authorId`, { authorId })
            .andWhere(`recipe.id NOT IN (${this.repository
            .createQueryBuilder('other_recipe')
            .select('other_recipe.copy_of', 'copy_id')
            .getSql()})`);
        await query.execute();
    }
}
exports.RecipeQueryBuilder = RecipeQueryBuilder;
