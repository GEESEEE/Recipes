import { Ingredient } from '../entities';
import BaseRepository, { BaseQueryBuilder } from './base';
export default class IngredientRepository extends BaseRepository<Ingredient> {
    get queryBuilder(): IngredientQueryBuilder;
}
export declare class IngredientQueryBuilder extends BaseQueryBuilder<Ingredient> {
    deleteOrphanIngredients(): Promise<any>;
    get default(): this;
}
