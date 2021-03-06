import { Brackets, EntityRepository, SelectQueryBuilder } from 'typeorm'
import { RecipeScopeArgs } from '@recipes/api-types/v1'
import BaseRepository from './base'
import { BaseRecipeQueryBuilder } from './base-recipe'
import { Recipe } from '@/entities'

@EntityRepository(Recipe)
export default class RecipeRepository extends BaseRepository<Recipe> {
    public queryBuilder(args?: RecipeScopeArgs): RecipeQueryBuilder {
        return new RecipeQueryBuilder(
            this,
            this.createQueryBuilder('recipe'),
            args
        )
    }

    public override transform(record: any): Recipe {
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
                      ]
        }

        if (
            typeof record.recipe_ingredient_id !== 'undefined' &&
            typeof record.ingredient_id !== 'undefined'
        ) {
            if (
                record.recipe_ingredient_id === null ||
                record.ingredient_id === null ||
                record.recipe_ingredient_ingredient_id !== record.ingredient_id
            ) {
                record.recipeIngredients = []
            } else {
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
                ]
            }
        }
        return super.transform(record)
    }
}

export class RecipeQueryBuilder extends BaseRecipeQueryBuilder<Recipe> {
    public override readonly scopes = {
        ids: 'recipeIds',
        section: 'sectionId',
        search: 'searchQuery',
        author: 'authorId',
        published: null,
    }

    public override readonly sorts = {
        createtime: 'created_at',
        preparetime: 'prepare_time',
        publishtime: 'published_at',
        peoplecount: 'people_count',
        ingredientcount: 'COUNT(recipe_ingredient.id)',
        instructioncount: 'COUNT(instruction.id)',
    }

    private readonly recipeIds?: number[]
    private readonly sectionId?: number
    private readonly searchQuery?: string[]
    private readonly authorId?: number

    public constructor(
        repository: BaseRepository<Recipe>,
        queryBuilder: SelectQueryBuilder<Recipe>,
        args?: RecipeScopeArgs
    ) {
        super(repository, queryBuilder)
        if (typeof args !== 'undefined') {
            for (const entry of Object.entries(args)) {
                // @ts-expect-error
                this[entry[0]] = entry[1]
            }
        }
    }

    private withoutItems(): this {
        return this.addSelect('recipe.*').addGroupBy('recipe.id')
    }

    private makeBaseQuery(): this {
        return this.withoutItems().joinRecipeItems()
    }

    public finish(): this {
        return this.finishRecipe()
    }

    public get default(): this {
        return this.makeBaseQuery()
    }

    public get published(): this {
        return this.makeBaseQuery().andWhere('recipe.published_at IS NOT NULL')
    }

    public get author(): this {
        return this.makeBaseQuery()
            .leftJoin('section', 'section', 'section.id = recipe.section_id')
            .andWhere('section.user_id = :authorId', {
                authorId: this.authorId,
            })
    }

    public get ids(): this {
        return this.makeBaseQuery().andWhere(`recipe.id IN (${this.recipeIds})`)
    }

    public get section(): this {
        return this.makeBaseQuery().andWhere('recipe.sectionId = :sectionId', {
            sectionId: this.sectionId,
        })
    }

    public get search(): this {
        if (typeof this.searchQuery === 'undefined') return this

        const queries = this.searchQuery.map((q) => {
            const query = `'%${q.trim()}%'`
            return `(${this.repository
                .createQueryBuilder('recipe')
                .select('recipe.id', 'id')
                .andWhere(
                    new Brackets((qb) => {
                        qb.where(`recipe.name ILIKE ${query}`)
                            .orWhere(`recipe.description ILIKE ${query}`)
                            .orWhere(
                                `recipe.id IN (${this.repository
                                    .createQueryBuilder('other_recipe')
                                    .select('other_recipe.id', 'id')
                                    .leftJoin(
                                        'recipe_ingredient',
                                        'recipe_ingredient',
                                        'recipe_ingredient.recipe_id = other_recipe.id'
                                    )
                                    .leftJoin(
                                        'ingredient',
                                        'ingredient',
                                        'recipe_ingredient.ingredient_id = ingredient.id'
                                    )
                                    .where(`ingredient.name ILIKE ${query}`)
                                    .getSql()})`
                            )
                    })
                )
                .getSql()})`
        })

        return this.andWhere(`recipe.id IN (${queries.join(' INTERSECT ')})`)
    }

    public async isCopied(recipeId: number): Promise<boolean> {
        const res = await this.repository.manager.query(`
            SELECT recipe.copy_of
            FROM recipe
            WHERE recipe.copy_of IS NOT null
        `)
        const ids = res.map((val: any) => val.copy_of)
        return ids.includes(recipeId)
    }

    public async getMaxRecipePosition(sectionId: number): Promise<number> {
        const res = await this.repository.manager.query(`
           SELECT MAX(recipe.position)
           FROM recipe
           WHERE recipe.section_id = ${sectionId}
        `)
        return res[0].max
    }
}
