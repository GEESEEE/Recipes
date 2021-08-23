import Recipe from '../data/recipe'
import Ingredient from '../data/ingredient'
import RecipeIngredient from '../data/recipe-ingredient'
import Instruction from '../data/instruction'
import { APIError } from '../config/constants'
import handleError from './base'

export async function createIngredient(body: {
    name: string
    unit?: string
}): Promise<Ingredient | APIError> {
    return handleError('POST', '/ingredients', { body })
}

export async function getIngredient(
    ingredientId: number
): Promise<Ingredient | APIError> {
    return handleError('GET', `/ingredients/${ingredientId}`)
}

export async function deleteIngredient(
    ingredientId: number
): Promise<Ingredient | APIError> {
    return handleError('DELETE', `/ingredients/${ingredientId}`)
}

export async function createRecipe(body: {
    name: string
    description: string
    prepareTime: number
    peopleCount: number
}): Promise<Recipe> {
    return handleError('POST', '/recipes', { body })
}

export async function createRecipes(
    body: {
        name: string
        description: string
        prepareTime: number
        peopleCount: number
    }[]
): Promise<Recipe[]> {
    return handleError('POST', '/recipes/bulk', { body })
}

export async function getMyRecipes(): Promise<Recipe[]> {
    return handleError('GET', '/recipes', {})
}

export async function getRecipe(recipeId: number): Promise<Recipe> {
    return handleError('GET', `/recipes/${recipeId}`)
}

export async function deleteRecipe(recipeId: number): Promise<void> {
    return handleError('DELETE', `/recipes/${recipeId}`)
}

export async function updateRecipe(
    recipeId: number,
    body: {
        name?: string
        description?: string
        prepareTime?: number
        peopleCount?: number
    }
): Promise<Recipe> {
    return handleError('PUT', `/recipes/${recipeId}`, { body })
}

export async function addIngredient(
    recipeId: number,
    ingredientId: number,
    amount: number
): Promise<RecipeIngredient> {
    return handleError(
        'POST',
        `/recipes/${recipeId}/ingredients/${ingredientId}`,
        { body: { amount } }
    )
}

export async function addIngredients(
    recipeId: number,
    body: Array<{ amount: number; name: string; unit?: string }>
): Promise<RecipeIngredient[]> {
    return handleError('POST', `/recipes/${recipeId}/ingredients/bulk`, {
        body,
    })
}

export async function removeIngredient(
    recipeId: number,
    ingredientId: number
): Promise<void> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/ingredients/${ingredientId}`
    )
}

export async function removeIngredients(
    recipeId: number,
    ingredientIds: number[],
): Promise<void> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/ingredients/bulk`,
        { body: ingredientIds}
    )
}

export async function getRecipeIngredients(
    recipeId: number
): Promise<RecipeIngredient[]> {
    return handleError('GET', `/recipes/${recipeId}/ingredients`)
}

export async function addInstruction(
    recipeId: number,
    body: { text: string }
): Promise<Instruction> {
    return handleError('POST', `/recipes/${recipeId}/instructions`, { body })
}

export async function addInstructions(
    recipeId: number,
    body: Array<{ text: string }>
): Promise<Instruction[]> {
    return handleError('POST', `/recipes/${recipeId}/instructions/bulk`, {
        body,
    })
}

export async function getInstructions(
    recipeId: number
): Promise<Instruction[]> {
    return handleError('GET', `/recipes/${recipeId}/instructions`)
}

export async function deleteInstruction(
    recipeId: number,
    instructionId: number
): Promise<void> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/instructions/${instructionId}`
    )
}

export async function deleteInstructions(
    recipeId: number,
    instructionIds: number[]
): Promise<void> {
    return handleError(
        'DELETE',
        `/recipes/${recipeId}/instructions/bulk`,
        { body: instructionIds }
    )
}

export async function updateInstruction(
    recipeId: number,
    instructionId: number,
    text: string
): Promise<Instruction> {
    return handleError(
        'PUT',
        `/recipes/${recipeId}/instructions/${instructionId}`,
        { body: { text } }
    )
}

export async function updateInstructions(
    recipeId: number,
    instructions: Array<{ instructionId: number, text: string }>
): Promise<any> {
    return handleError(
        'PUT',
        `/recipes/${recipeId}/instructions/bulk`,
        { body: instructions}
    )
}
