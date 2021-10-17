"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientQueryBuilder = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const base_1 = (0, tslib_1.__importStar)(require("./base"));
let IngredientRepository = class IngredientRepository extends base_1.default {
    get queryBuilder() {
        return new IngredientQueryBuilder(this, this.createQueryBuilder('ingredient'));
    }
};
IngredientRepository = (0, tslib_1.__decorate)([
    (0, typeorm_1.EntityRepository)(entities_1.Ingredient)
], IngredientRepository);
exports.default = IngredientRepository;
class IngredientQueryBuilder extends base_1.BaseQueryBuilder {
    deleteOrphanIngredients() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.delete()
                .where(`id NOT IN (${this.repository.manager
                .createQueryBuilder(entities_1.RecipeIngredient, 'ri')
                .select('ri.ingredient_id')
                .getSql()})`)
                .execute();
        });
    }
    get default() {
        return this;
    }
}
exports.IngredientQueryBuilder = IngredientQueryBuilder;
