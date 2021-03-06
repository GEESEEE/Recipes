import countBy from 'lodash/countBy'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'
import { SortQueryTuple, PaginationObject } from '@recipes/api-types/v1'
import { groupBy, mergeGroup } from '@/utils'
import { UnprocessableError } from '@/errors'

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

        const grouped = groups.map((groupedRecords) =>
            groupedRecords.map(this.transform.bind(this))
        )

        const res = grouped.map((group) => mergeGroup(group))

        return res
    }

    mergeAll(arr: any[]): any[] {
        const temp: any[][] = groupBy(arr, 'id')
        return temp.map((arr) => this.mergeArray(arr))
    }

    mergeArray(arr: any[]): any {
        if (arr.length <= 1) return arr
        let res = arr[0]
        arr = arr.slice(1)
        for (const obj of arr) {
            res = this.mergeObjects(res, obj)
        }
        return res
    }

    mergeObjects(obj1: object, obj2: object): object {
        const res: any = {}
        for (const [key1, value1] of Object.entries(obj1)) {
            for (const [key2, value2] of Object.entries(obj2)) {
                if (key1 === key2) {
                    if (Array.isArray(value1) && Array.isArray(value2)) {
                        res[key1] = this.mergeAll(value1.concat(value2))
                    } else {
                        res[key1] = value2
                    }
                }
            }
        }
        return res
    }
}

export abstract class BaseQueryBuilder<T> extends SelectQueryBuilder<T> {
    public readonly scopes: { [key: string]: string | null } = {}
    public readonly sorts: { [key: string]: string } = {}
    public readonly repository: BaseRepository<T>

    public constructor(
        repository: BaseRepository<T>,
        queryBuilder: SelectQueryBuilder<T>
    ) {
        super(queryBuilder)
        this.repository = repository
    }

    public abstract get default(): this

    public validate(props: {
        scopes?: string[]
        sort?: SortQueryTuple<string>[]
    }): this {
        const { scopes, sort } = props

        if (typeof scopes !== 'undefined' && scopes.length > 0) {
            if (!this.hasScopes(scopes)) {
                throw new UnprocessableError('Invalid Scope')
            }

            const scopesWithoutArgs = this.checkArgs(scopes)
            if (scopesWithoutArgs.length > 0) {
                throw new UnprocessableError(
                    `The following scopes have no arguments: ${scopesWithoutArgs.join(
                        ', '
                    )}`
                )
            }

            this.applyScopes(scopes)
        }

        if (typeof sort !== 'undefined' && sort.length > 0) {
            if (!this.hasSorts(sort)) {
                throw new UnprocessableError('Invalid Sort')
            }

            this.applySorts(sort)
        }

        return this
    }

    private hasScopes(scopes?: string[]): boolean {
        if (typeof scopes === 'undefined') {
            return true
        }

        return scopes.every(
            (scope) =>
                scope === 'default' || Object.keys(this.scopes).includes(scope)
        )
    }

    private checkArgs(scopes?: string[]): string[] {
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

    private applyScopes(scopes?: string[]): this {
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

    private hasSorts(sortQuery: SortQueryTuple<string>[]): boolean {
        return sortQuery.every((sort: SortQueryTuple<string>) =>
            Object.keys(this.sorts).includes(sort[0])
        )
    }

    private applySorts(sortQuery: SortQueryTuple<string>[]): this {
        if (sortQuery.length === 0) return this

        return sortQuery.reduce((qb, sort) => {
            if (!Object.keys(this.sorts).includes(sort[0]))
                throw new Error(`Invalid sort "${sort[0]}" called`)
            return qb.addOrderBy(qb.sorts[sort[0]], sort[1])
        }, this)
    }

    public async paginate(
        page = 1,
        perPage = 20,
        property?: string
    ): Promise<PaginationObject<any>> {
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
