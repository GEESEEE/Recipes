import { EntityRepository } from 'typeorm'
import BaseRepository, { BaseQueryBuilder } from './base'
import { Ingredient, RecipeIngredient } from '@/entities'

@EntityRepository(Ingredient)
export default class IngredientRepository extends BaseRepository<Ingredient> {
    public get queryBuilder(): IngredientQueryBuilder {
        return new IngredientQueryBuilder(
            this,
            this.createQueryBuilder('ingredient')
        )
    }
}

export class IngredientQueryBuilder extends BaseQueryBuilder<Ingredient> {
    public async deleteOrphanIngredients(): Promise<void> {
        await this.delete()
            .where(
                `id NOT IN (${this.repository.manager
                    .createQueryBuilder(RecipeIngredient, 'ri')
                    .select('ri.ingredient_id')
                    .getSql()})`
            )
            .execute()
    }

    public get default(): this {
        return this
    }
}
