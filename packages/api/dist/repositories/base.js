"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueryBuilder = void 0;
const tslib_1 = require("tslib");
const lodash_1 = (0, tslib_1.__importStar)(require("lodash")), lodash = lodash_1;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const util_1 = require("../util/util");
class BaseRepository extends typeorm_1.Repository {
    transform(record) {
        return (0, class_transformer_1.plainToClass)(this.target, record, {
            excludeExtraneousValues: true,
        });
    }
    transformMany(records, skip, take) {
        let groups = (0, util_1.groupBy)(records, 'id');
        if (typeof skip !== 'undefined' && skip > 0) {
            groups = groups.filter((_group, index) => index >= skip);
        }
        if (typeof take !== 'undefined') {
            groups = groups.filter((_group, index) => index < take);
        }
        return groups
            .map((groupedRecords) => groupedRecords.map(this.transform.bind(this)))
            .map(([first, ...rest]) => lodash.mergeWith(first, ...rest, (objValue, srcValue) => {
            if (Array.isArray(objValue)) {
                const srcVal = srcValue[0];
                objValue = objValue.filter((item) => !lodash_1.default.isEqual(item, srcVal));
                objValue.push(srcVal);
                return objValue;
            }
            return undefined;
        }));
    }
}
exports.default = BaseRepository;
class BaseQueryBuilder extends typeorm_1.SelectQueryBuilder {
    scopes = {};
    sorts = {};
    repository;
    paginate;
    constructor(repository, queryBuilder, args) {
        super(queryBuilder);
        this.repository = repository;
        if (typeof args !== 'undefined') {
            for (const entry of Object.entries(args)) {
                // @ts-expect-error
                this[entry[0]] = entry[1];
            }
        }
    }
    hasScopes(scopes) {
        if (typeof scopes === 'undefined') {
            return true;
        }
        return scopes.every((scope) => scope === 'default' || Object.keys(this.scopes).includes(scope));
    }
    checkArgs(scopes) {
        const invalid = [];
        if (typeof scopes === 'undefined') {
            return invalid;
        }
        for (const scope of scopes) {
            const arg = this.scopes[scope];
            // @ts-expect-error
            if (arg !== null && typeof this[arg] === 'undefined') {
                invalid.push(arg);
            }
        }
        return invalid;
    }
    applyScopes(scopes) {
        if (typeof scopes === 'undefined') {
            return this.default;
        }
        return scopes.reduce((qb, scope) => {
            if (scope !== 'default' &&
                !Object.keys(this.scopes).includes(scope)) {
                throw new Error(`Invalid scope "${scope}" called`);
            }
            // @ts-expect-error
            return qb[scope];
        }, this);
    }
    hasSorts(sortQuery) {
        return sortQuery.every((sort) => Object.keys(this.sorts).includes(sort[0]));
    }
    applySorts(sortQuery) {
        if (sortQuery.length === 0)
            return this;
        return sortQuery.reduce((qb, sort) => {
            if (!Object.keys(this.sorts).includes(sort[0]))
                throw new Error(`Invalid sort "${sort[0]}" called`);
            return qb.addOrderBy(qb.sorts[sort[0]], sort[1]);
        }, this);
    }
    async pagination(page, perPage, property) {
        const skip = (page - 1) * perPage;
        const rawRecords = await this.getRawMany();
        const count = Object.keys(lodash_1.default.countBy(rawRecords, property ?? 'id')).length;
        const calculeLastPage = count % perPage;
        const lastPage = calculeLastPage === 0
            ? count / perPage
            : Math.trunc(count / perPage) + 1;
        const res = this.repository.transformMany(rawRecords, skip, perPage);
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
        };
    }
    existsQuery(builder) {
        return `exists (${builder.getQuery()})`;
    }
    async getMany() {
        return this.repository.transformMany(await super.getRawMany());
    }
    async getOne() {
        return this.repository.transformMany(await super.getRawMany()).shift();
    }
    leftJoin(entityOrProperty, alias, condition, parameters) {
        if (this.expressionMap.joinAttributes.some((attribute) => attribute.entityOrProperty === entityOrProperty)) {
            return this;
        }
        return super.leftJoin(entityOrProperty, alias, condition, parameters);
    }
    leftJoinAndSelect(entityOrProperty, alias, condition, parameters) {
        if (this.expressionMap.joinAttributes.some((attribute) => attribute.entityOrProperty === entityOrProperty)) {
            return this;
        }
        return super.leftJoinAndSelect(entityOrProperty, alias, condition, parameters);
    }
}
exports.BaseQueryBuilder = BaseQueryBuilder;
