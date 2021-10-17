import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { SortQueryTuple } from '../util/request';
export default abstract class BaseRepository<T> extends Repository<T> {
    transform(record: any): T;
    transformMany(records: any[], skip?: number, take?: number): T[];
}
export interface PaginationObject {
    from: any;
    to: any;
    per_page: any;
    total: number | any;
    current_page: number;
    prev_page?: number | null;
    next_page?: number | null;
    last_page: number | null;
    data: Array<object | any> | any;
}
export declare abstract class BaseQueryBuilder<T> extends SelectQueryBuilder<T> {
    readonly scopes: {
        [key: string]: string | null;
    };
    readonly sorts: {
        [key: string]: string;
    };
    readonly repository: BaseRepository<T>;
    paginate: (perPage?: number | undefined) => Promise<PaginationObject>;
    constructor(repository: BaseRepository<T>, queryBuilder: SelectQueryBuilder<T>, args?: object);
    abstract get default(): this;
    hasScopes(scopes?: string[]): boolean;
    checkArgs(scopes?: string[]): string[];
    applyScopes(scopes?: string[]): this;
    hasSorts(sortQuery: SortQueryTuple[]): boolean;
    applySorts(sortQuery: SortQueryTuple[]): this;
    pagination(page: number, perPage: number, property?: string): Promise<PaginationObject>;
    existsQuery<T>(builder: SelectQueryBuilder<T>): any;
    getMany(): Promise<T[]>;
    getOne(): Promise<T | undefined>;
    leftJoin(entityOrProperty: ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>) | string | Function, alias: string, condition?: string, parameters?: ObjectLiteral): this;
    leftJoinAndSelect(entityOrProperty: ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>) | string | Function, alias: string, condition?: string, parameters?: ObjectLiteral): this;
}
