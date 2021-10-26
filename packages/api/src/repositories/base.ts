import mergeWith from 'lodash/mergeWith'
import isEqual from 'lodash/isEqual'
import countBy from 'lodash/countBy'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'
import { PaginationObject } from '@recipes/api-types/v1'
import { SortQueryTuple, groupBy } from '@/utils'

export default abstract class BaseRepository<T> extends Repository<T> {
    public transform(record: any): T {
        return plainToClass(this.target as ClassConstructor<T>, record, {
            excludeExtraneousValues: true,
        })
    }

    public transformMany(records: any[], skip?: number, take?: number): T[] {
        let groups = groupBy(records, 'id')

        if (typeof skip !== 'undefined' && skip > 0) {
            groups = groups.filter((_group, index) => index >= skip)
        }

        if (typeof take !== 'undefined') {
            groups = groups.filter((_group, index) => index < take)
        }

        return groups
            .map((groupedRecords) =>
                groupedRecords.map(this.transform.bind(this))
            )
            .map(([first, ...rest]) =>
                mergeWith(first, ...rest, (objValue: any, srcValue: any) => {
                    if (Array.isArray(objValue)) {
                        const srcVal = srcValue[0]
                        objValue = objValue.filter(
                            (item) => !isEqual(item, srcVal)
                        )
                        objValue.push(srcVal)
                        return objValue
                    }
                    return undefined
                })
            )
    }
}

export abstract class BaseQueryBuilder<T> extends SelectQueryBuilder<T> {
    public readonly scopes: { [key: string]: string | null } = {}
    public readonly sorts: { [key: string]: string } = {}
    public readonly repository: BaseRepository<T>

    public paginate!: (
        perPage?: number | undefined
    ) => Promise<PaginationObject>

    public constructor(
        repository: BaseRepository<T>,
        queryBuilder: SelectQueryBuilder<T>
    ) {
        super(queryBuilder)
        this.repository = repository
    }

    public abstract get default(): this

    public hasScopes(scopes?: string[]): boolean {
        if (typeof scopes === 'undefined') {
            return true
        }

        return scopes.every(
            (scope) =>
                scope === 'default' || Object.keys(this.scopes).includes(scope)
        )
    }

    public checkArgs(scopes?: string[]): string[] {
        const invalid: string[] = []
        if (typeof scopes === 'undefined') {
            return invalid
        }

        for (const scope of scopes) {
            const arg = this.scopes[scope]
            // @ts-expect-error
            if (arg !== null && typeof this[arg] === 'undefined') {
                invalid.push(scope)
            }
        }

        return invalid
    }

    public applyScopes(scopes?: string[]): this {
        if (typeof scopes === 'undefined') {
            return this.default
        }
        return scopes.reduce((qb, scope) => {
            if (
                scope !== 'default' &&
                !Object.keys(this.scopes).includes(scope)
            ) {
                throw new Error(`Invalid scope "${scope}" called`)
            }
            // @ts-expect-error
            return qb[scope]
        }, this)
    }

    public hasSorts(sortQuery: SortQueryTuple[]): boolean {
        return sortQuery.every((sort: SortQueryTuple) =>
            Object.keys(this.sorts).includes(sort[0])
        )
    }

    public applySorts(sortQuery: SortQueryTuple[]): this {
        if (sortQuery.length === 0) return this

        return sortQuery.reduce((qb, sort) => {
            if (!Object.keys(this.sorts).includes(sort[0]))
                throw new Error(`Invalid sort "${sort[0]}" called`)
            return qb.addOrderBy(qb.sorts[sort[0]], sort[1])
        }, this)
    }

    public async pagination(
        page: number,
        perPage: number,
        property?: string
    ): Promise<PaginationObject> {
        const skip = (page - 1) * perPage
        const rawRecords = await this.getRawMany()
        const count = Object.keys(countBy(rawRecords, property ?? 'id')).length
        const calculeLastPage = count % perPage
        const lastPage =
            calculeLastPage === 0
                ? count / perPage
                : Math.trunc(count / perPage) + 1
        const res = this.repository.transformMany(rawRecords, skip, perPage)
        return {
            from: skip <= count ? skip + 1 : null,
            to: count > skip + perPage ? skip + perPage : count,
            per_page: perPage,
            total: count,
            current_page: page,
            prev_page: page > 1 ? page - 1 : null,
            next_page: count > skip + perPage ? page + 1 : null,
            last_page: lastPage,
            data: res,
        }
    }

    public existsQuery<T>(builder: SelectQueryBuilder<T>): any {
        return `exists (${builder.getQuery()})`
    }

    public override async getMany(): Promise<T[]> {
        return this.repository.transformMany(await super.getRawMany())
    }

    public override async getOne(): Promise<T | undefined> {
        return this.repository.transformMany(await super.getRawMany()).shift()
    }

    public override leftJoin(
        entityOrProperty:
            | ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>)
            | string
            | Function,
        alias: string,
        condition?: string,
        parameters?: ObjectLiteral
    ): this {
        if (
            this.expressionMap.joinAttributes.some(
                (attribute) => attribute.entityOrProperty === entityOrProperty
            )
        ) {
            return this
        }
        return super.leftJoin(entityOrProperty, alias, condition, parameters)
    }

    public override leftJoinAndSelect(
        entityOrProperty:
            | ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>)
            | string
            | Function,
        alias: string,
        condition?: string,
        parameters?: ObjectLiteral
    ): this {
        if (
            this.expressionMap.joinAttributes.some(
                (attribute) => attribute.entityOrProperty === entityOrProperty
            )
        ) {
            return this
        }
        return super.leftJoinAndSelect(
            entityOrProperty as string,
            alias,
            condition,
            parameters
        )
    }
}
