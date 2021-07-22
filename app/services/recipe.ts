import Recipe from "../data/recipe";
import Ingredient from "../data/ingredient";
import RecipeIngredient from "../data/recipe-ingredient";
import Instruction from "../data/instruction";
import { APIError } from "../config/constants"
import handleError from './base'

export async function createIngredient(body: {name: string, unit?: string}): Promise<Ingredient | APIError> {
    return handleError(
        'POST',
        '/ingredients',
        {body}
    )
}

export async function getIngredient(ingredientId: number): Promise<Ingredient  | APIError> {
    return handleError(
        'GET',
        `/ingredients/${ingredientId}`,
    )
}

export async function deleteIngredient(ingredientId: number): Promise<Ingredient | APIError> {
    return handleError(
        'DELETE',
        `/ingredients/${ingredientId}`,
    )
}

export async function createRecipe(
    body: {
        name: string,
        description: string,
        prepareTime: number,
        peopleCount: number
    } ): Promise<Recipe | APIError> {
        return handleError('POST',
        '/recipes',
        {body}
    )

}

export async function getRecipes(): Promise<Recipe[] | APIError> {
    return handleError(
        'GET',
        '/recipes'
    )
}

export async function getRecipe(recipeId: number): Promise<Recipe | APIError> {
    return handleError(
        'GET',
        `/recipes/${recipeId}`
    )
}

export async function deleteRecipe(recipeId: number): Promise<void  | APIError> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}`
    )
}

export async function updateRecipe(
    recipeId: number,
    body: {
        name?: string,
        description?: string,
        prepareTime?: number,
        peopleCount?: number
    } ): Promise<Recipe | APIError> {
        return handleError(
            'PUT',
            `/recipes/${recipeId}`,
            {body}
        )
}

export async function addIngredient(
        recipeId: number,
        ingredientId: number,
        amount: number
    ): Promise<RecipeIngredient | APIError> {
    return handleError(
        'POST',
        `/recipes/${recipeId}/ingredients/${ingredientId}`,
        {body: {amount}}
    )
}

export async function removeIngredient(
    recipeId: number,
    ingredientId: number
): Promise<void | APIError> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/ingredients/${ingredientId}`
    )
}

export async function getRecipeIngredients(recipeId: number): Promise<RecipeIngredient[] | APIError> {
    return handleError(
        'GET',
        `/recipes/${recipeId}/ingredients`
    )
}

export async function addInstruction(recipeId: number, text: string): Promise<Instruction | APIError> {
    return handleError(
        'POST',
        `/recipes/${recipeId}/instructions`,
        {body: { text}}
    )
}

export async function getInstructions(recipeId: number): Promise<Instruction[] | APIError> {
    return handleError(
        'GET',
        `/recipes/${recipeId}/instructions`
    )
}

export async function removeInstruction(recipeId: number, instructionId: number): Promise<void | APIError> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/instructions/${instructionId}`
    )
}

export async function updateInstruction(
    recipeId: number, instructionId: number, text: string): Promise<Instruction | APIError> {
    return handleError(
        'PUT',
        `/recipes/${recipeId}/instructions/${instructionId}`,
        {body: { text}}
    )
}

