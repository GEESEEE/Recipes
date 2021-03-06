import { EntityRepository, SelectQueryBuilder } from 'typeorm'
import { SectionScopeArgs } from '@recipes/api-types/v1'
import BaseRepository from './base'
import { BaseRecipeQueryBuilder } from './base-recipe'
import { Section } from '@/entities'

@EntityRepository(Section)
export default class SectionRespository extends BaseRepository<Section> {
    public queryBuilder(args?: SectionScopeArgs): SectionQueryBuilder {
        return new SectionQueryBuilder(
            this,
            this.createQueryBuilder('section'),
            args
        )
    }

    public override transform(record: any): Section {
        if (record.recipe_id == null) {
            record.recipes = []
        } else {
            const instructions =
                record.instruction_id == null ||
                record.instruction_recipe_id !== record.recipe_id
                    ? []
                    : [
                          {
                              id: record.instruction_id,
                              text: record.instruction_text,
                              position: record.instruction_position,
                              recipe_id: record.instruction_recipe_id,
                          },
                      ]
            const recipeIngredients =
                record.recipe_ingredient_id == null ||
                record.ingredient_id == null ||
                record.recipe_ingredient_recipe_id !== record.recipe_id ||
                record.recipe_ingredient_ingredient_id !== record.ingredient_id
                    ? []
                    : [
                          {
                              id: record.recipe_ingredient_id,
                              ingredient_id:
                                  record.recipe_ingredient_ingredient_id,
                              recipe_id: record.recipe_ingredient_recipe_id,
                              amount: record.recipe_ingredient_amount,
                              position: record.recipe_ingredient_position,
                              ingredient: {
                                  id: record.ingredient_id,
                                  name: record.ingredient_name,
                                  unit: record.ingredient_unit,
                              },
                          },
                      ]
            record.recipes = [
                {
                    id: record.recipe_id,
                    name: record.recipe_name,
                    description: record.recipe_description,
                    prepare_time: record.recipe_prepare_time,
                    people_count: record.recipe_people_count,
                    created_at: record.recipe_created_at,
                    position: record.recipe_position,
                    instructions,
                    recipeIngredients,
                },
            ]
        }

        return super.transform(record)
    }
}

export class SectionQueryBuilder extends BaseRecipeQueryBuilder<Section> {
    public override readonly scopes = {
        user: 'userId',
        recipes: 'recipeIds',
        ids: 'sectionIds',
    }

    private readonly userId?: number
    private readonly recipeIds?: number[]
    private readonly sectionIds?: number[]

    public constructor(
        repository: BaseRepository<Section>,
        queryBuilder: SelectQueryBuilder<Section>,
        args?: SectionScopeArgs
    ) {
        super(repository, queryBuilder)
        if (typeof args !== 'undefined') {
            for (const entry of Object.entries(args)) {
                // @ts-expect-error
                this[entry[0]] = entry[1]
            }
        }
    }

    private makeBaseQuery(): this {
        return this.addSelect('section.*').addGroupBy('section.id')
    }

    public finish(): this {
        return this.addOrderBy('section.position', 'ASC')
    }

    public get default(): this {
        return this.makeBaseQuery()
    }

    public get user(): this {
        return this.makeBaseQuery().andWhere('section.userId = :userId', {
            userId: this.userId,
        })
    }

    public finishRecipes(): this {
        return this.finish().finishRecipe()
    }

    public get recipes(): this {
        const qb = this.makeBaseQuery()
            .leftJoinAndSelect(
                'recipe',
                'recipe',
                `recipe.sectionId = section.id`
            )
            .addGroupBy('recipe.id')
            .joinRecipeItems()

        if (typeof this.recipeIds !== 'undefined') {
            return qb.andWhere(`recipe.id IN (${this.recipeIds})`)
        }
        return qb
    }

    public get ids(): this {
        return this.makeBaseQuery().andWhere(
            `section.id IN (${this.sectionIds})`
        )
    }
}
