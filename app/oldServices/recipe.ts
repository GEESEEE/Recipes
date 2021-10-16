import { Recipe, RecipeIngredient, Instruction } from '@/data'
import handleError from './base'

export type Scope = 'published' | 'author'

export interface PaginationObject {
    from: any
    to: any
    per_page: any
    total: number | any
    current_page: number
    prev_page?: number | null
    next_page?: number | null
    last_page: number | null
    data: Array<any> | any
}

export interface GetRecipeParams {
    scopes?: Scope[]
    search?: string[]
    sort?: string[]
    perPage?: number
    page?: number
    body?: {
        authorId?: number
    }
}

export async function createRecipes(
    body: {
        name: string
        description: string
        prepareTime: number
        peopleCount: number
        publishedAt: Date | null
        createdAt: Date
    }[]
): Promise<Recipe[]> {
    return handleError('POST', '/recipes/bulk', { body })
}

export async function getRecipe(recipeId: number): Promise<Recipe> {
    return handleError('GET', `/recipes/${recipeId}`)
}

export async function getRecipes({
    scopes,
    search,
    sort,
    perPage,
    page,
    body,
}: GetRecipeParams): Promise<PaginationObject> {
    let suffix = ''
    if (typeof scopes !== 'undefined') {
        suffix = suffix.concat(`?scopes=${scopes.join(',')}`)
    }

    if (typeof search !== 'undefined' && search.length > 0) {
        suffix = suffix.concat(`&search=${search}`)
    }

    if (typeof sort !== 'undefined' && sort.length > 0) {
        suffix = suffix.concat(`&sort=${sort.join(',')}`)
    }

    if (typeof perPage !== 'undefined') {
        suffix = suffix.concat(`&per_page=${perPage}`)
    }

    if (typeof page !== 'undefined') {
        suffix = suffix.concat(`&page=${page}`)
    }

    return handleError('GET', `/recipes${suffix}`, { body })
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
        publishedAt?: Date | null
    }
): Promise<Recipe> {
    return handleError('PUT', `/recipes/${recipeId}`, { body })
}

export async function addIngredients(
    recipeId: number,
    body: Array<{
        amount: number
        position: number
        name: string
        unit: string | null
    }>
): Promise<RecipeIngredient[]> {
    return handleError('POST', `/recipes/${recipeId}/ingredients/bulk`, {
        body,
    })
}

export async function removeIngredients(
    recipeId: number,
    ingredientIds: number[]
): Promise<void> {
    return handleError('DELETE', `/recipes/${recipeId}/ingredients/bulk`, {
        body: ingredientIds,
    })
}

export async function updateIngredients(
    recipeId: number,
    body: Array<{
        recipeIngredientId: number
        amount?: number
        position?: number
        name?: string
        unit?: string | null
    }>
): Promise<RecipeIngredient[]> {
    return handleError('PUT', `/recipes/${recipeId}/ingredients/bulk`, { body })
}

export async function addInstructions(
    recipeId: number,
    body: Array<{ text: string; position: number }>
): Promise<Instruction[]> {
    return handleError('POST', `/recipes/${recipeId}/instructions/bulk`, {
        body,
    })
}

export async function deleteInstructions(
    recipeId: number,
    instructionIds: number[]
): Promise<void> {
    return handleError('DELETE', `/recipes/${recipeId}/instructions/bulk`, {
        body: instructionIds,
    })
}

export async function updateInstructions(
    recipeId: number,
    instructions: Array<{
        instructionId: number
        text?: string
        position?: number
    }>
): Promise<any> {
    return handleError('PUT', `/recipes/${recipeId}/instructions/bulk`, {
        body: instructions,
    })
}
