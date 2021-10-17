import { Instruction, Recipe, RecipeIngredient } from '../../entities';
import { interfaces } from 'inversify-express-utils';
import { Request } from 'express';
import { SortQueryTuple } from '../../util/request';
import { PaginationObject } from '../../repositories/base';
import { ModifyError } from './base';
export default class RecipeController implements interfaces.Controller {
    private readonly recipeService;
    private checkRecipeAbility;
    createRecipe(req: Request, body: {
        name: string;
        description: string;
        prepareTime: number;
        peopleCount: number;
        publishedAt?: Date | null;
        createdAt?: Date;
        copyOf?: number | null;
    }): Promise<Recipe>;
    createRecipes(req: Request, body: Array<{
        name: string;
        description: string;
        prepareTime: number;
        peopleCount: number;
        publishedAt?: Date | null;
        createdAt?: Date;
        copyOf?: number | null;
    }>): Promise<Recipe[]>;
    getRecipe(req: Request, recipeId: number): Promise<Recipe>;
    getRecipes(req: Request, body: {
        authorId?: number;
    }, scopes?: string[], search?: string[], sort?: SortQueryTuple[]): Promise<PaginationObject>;
    updateRecipe(req: Request, recipeId: number, body: {
        name?: string;
        description?: string;
        prepareTime?: number;
        peopleCount?: number;
        publishedAt?: Date | null;
    }): Promise<Recipe>;
    deleteRecipe(req: Request, recipeId: number): Promise<void>;
    addIngredients(req: Request, recipeId: number, body: Array<{
        amount: number;
        position: number;
        name: string;
        unit: string | null;
    }>): Promise<RecipeIngredient[]>;
    updateIngredients(req: Request, recipeId: number, body: Array<{
        recipeIngredientId: number;
        amount?: number;
        position?: number;
        name?: string;
        unit?: string;
    }>): Promise<Array<RecipeIngredient | ModifyError>>;
    removeIngredients(req: Request, recipeId: number, body: number[]): Promise<ModifyError[]>;
    addInstructions(req: Request, recipeId: number, body: Array<{
        text: string;
        position: number;
    }>): Promise<Instruction[]>;
    updateInstructions(req: Request, recipeId: number, body: Array<{
        instructionId: number;
        text?: string;
        position?: number;
    }>): Promise<Array<Instruction | ModifyError>>;
    deleteInstructions(req: Request, recipeId: number, body: number[]): Promise<ModifyError[]>;
    private static validate;
}
