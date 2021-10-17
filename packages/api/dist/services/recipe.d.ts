import { Ingredient, Instruction, Recipe, RecipeIngredient } from '../entities';
import { SortQueryTuple } from '../util/request';
import { RecipeScopeArgs } from '../repositories/recipe';
import { PaginationObject } from '../repositories/base';
export default class RecipeService {
    private readonly recipeRepository;
    private readonly ingredientRepository;
    private readonly recipeIngredientRepository;
    private readonly instructionRepository;
    createIngredient({ name, unit, }: {
        name: string;
        unit?: string;
    }): Promise<Ingredient>;
    deleteIngredient(ingredientId: number): Promise<boolean>;
    getIngredient(ingredientId: number): Promise<Ingredient | undefined>;
    createRecipes(recipes: Array<{
        name: string;
        description: string;
        prepareTime: number;
        peopleCount: number;
        publishedAt?: Date;
        createdAt?: Date;
        copyOf?: number | null;
        authorId: number;
    }>): Promise<Recipe[]>;
    getRecipe(recipeId: number): Promise<Recipe | undefined>;
    getRecipesByScopes(scopes: string[], args: RecipeScopeArgs, sort: SortQueryTuple[]): Promise<PaginationObject>;
    updateRecipe(recipe: Recipe, { name, description, prepareTime, peopleCount, publishedAt, }: {
        name?: string;
        description?: string;
        prepareTime?: number;
        peopleCount?: number;
        publishedAt?: Date | null;
    }): Promise<Recipe>;
    deleteRecipe(recipeId: number): Promise<boolean>;
    addIngredients(ingredients: Array<{
        name: string;
        unit: string | null;
    }>): Promise<Ingredient[]>;
    addRecipeIngredients(recipeId: number, ingredients: Array<{
        amount: number;
        position: number;
        name: string;
        unit: string | null;
    }>): Promise<RecipeIngredient[]>;
    updateRecipeIngredients(recipeIngredients: Array<{
        recipeIngredientId: number;
        amount?: number;
        position?: number;
        name?: string;
        unit?: string;
    }>): Promise<RecipeIngredient[]>;
    removeRecipeIngredients(recipeId: number, ingredientIds: number[]): Promise<void>;
    addInstructions(recipeId: number, instructions: Array<{
        text: string;
        position: number;
    }>): Promise<Instruction[]>;
    deleteInstructions(instructionIds: number[]): Promise<void>;
    getInstructions(recipeId: number): Promise<Instruction[]>;
    updateInstructions(instructions: Array<{
        instructionId: number;
        text?: string;
        position?: number;
    }>): Promise<Instruction[]>;
}
