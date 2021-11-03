import { BaseQueryBuilder } from './base'

export abstract class BaseSectionQueryBuilder<T> extends BaseQueryBuilder<T> {
    public joinIngredient(): this {
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
            .addGroupBy('recipe_ingredient.id')
            .addGroupBy('ingredient.id')
    }

    public finishIngredient(): this {
        return this.addOrderBy('recipe_ingredient.position', 'ASC')
    }

    public joinInstruction(): this {
        return this.leftJoinAndSelect(
            'instruction',
            'instruction',
            'instruction.recipe_id = recipe.id'
        ).addGroupBy('instruction.id')
    }

    public finishInstruction(): this {
        return this.addOrderBy('instruction.position', 'ASC')
    }

    public joinRecipe(): this {
        return this.leftJoinAndSelect(
            'recipe',
            'recipe',
            `recipe.sectionId = section.id`
        ).addGroupBy('recipe.id')
    }
    public finishRecipe(): this {
        return this.addOrderBy('recipe.position', 'ASC')
    }
}
