import { EntityRepository, SelectQueryBuilder } from 'typeorm'
import BaseRepository, { BaseQueryBuilder } from './base'
import { Section } from '@/entities'
import { SectionScopeArgs } from '@/types'

@EntityRepository(Section)
export default class SectionRespository extends BaseRepository<Section> {
    public queryBuilder(args?: SectionScopeArgs): SectionQueryBuilder {
        return new SectionQueryBuilder(
            this,
            this.createQueryBuilder('section'),
            args
        )
    }
}

export class SectionQueryBuilder extends BaseQueryBuilder<Section> {
    public override readonly scopes = {
        user: 'userId',
        recipes: 'recipeIds',
    }

    private readonly userId?: number
    private readonly recipeIds?: number[]

    public constructor(
        repository: BaseRepository<Section>,
        queryBuilder: SelectQueryBuilder<Section>,
        args?: SectionScopeArgs
    ) {
        super(repository, queryBuilder)
        if (typeof args !== 'undefined') {
            for (const entry of Object.entries(args)) {
                this[entry[0] as keyof this] = entry[1]
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

    public get recipes(): this {
        return this.makeBaseQuery()
            .leftJoinAndSelect(
                'recipe',
                'recipe',
                `recipe.sectionId = section.id`
            )
            .andWhere('recipe.id IN :recipeIds', { recipeIds: this.recipeIds })
    }
}
