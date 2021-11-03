import { BaseQueryBuilder } from './base'

export abstract class BaseRecipeQueryBuilder<T> extends BaseQueryBuilder<T> {
    public joinRecipeItems(): this {
        return this.leftJoinAndSelect(
            'recipe_ingredient',
            'recipe_ingredient',
            'recipe_ingredient.recipe_id = recipe.id'
        )
            .leftJoinAndSelect(
                'ingredient',
                'ingredient',
                'recipe_ingredient.ingredient_id = ingredient.id'
            )
            .leftJoinAndSelect(
                'instruction',
                'instruction',
                'instruction.recipe_id = recipe.id'
            )
            .addGroupBy('instruction.id')
            .addGroupBy('recipe_ingredient.id')
            .addGroupBy('ingredient.id')
    }

    public finishRecipe(): this {
        return this.addOrderBy('instruction.position', 'ASC')
            .addOrderBy('recipe_ingredient.position', 'ASC')
            .addOrderBy('recipe.position', 'ASC')
    }
}
