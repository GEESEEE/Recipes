import { Recipe } from '../entities';
import BaseRepository, { BaseQueryBuilder } from './base';
export default class RecipeRepository extends BaseRepository<Recipe> {
    queryBuilder(args?: object): RecipeQueryBuilder;
    transform(record: any): Recipe;
}
export interface RecipeScopeArgs {
    authorId?: number;
    searchQuery?: string[];
}
export declare type RecipeSortQuery = 'preparetime' | 'ingredientcount' | 'publishtime';
export declare class RecipeQueryBuilder extends BaseQueryBuilder<Recipe> {
    readonly scopes: {
        published: null;
        author: string;
        search: string;
    };
    readonly sorts: {
        createtime: string;
        publishtime: string;
        preparetime: string;
        peoplecount: string;
        ingredientcount: string;
        instructioncount: string;
    };
    private readonly authorId?;
    private readonly searchQuery?;
    private makeBaseQuery;
    finish(): this;
    get default(): this;
    get published(): this;
    get author(): this;
    get search(): this;
    byId(recipeId: number): this;
    deleteUncopiedRecipesFromAuthor(authorId: number): Promise<any>;
}
