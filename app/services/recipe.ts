import * as recipeService from '../rest/recipe'
import { Instruction, Recipe, RecipeIngredient } from '../data'

type RecipeUpdateObject = {
    name?: string
    description?: string
    peopleCount?: number
    prepareTime?: number
}

type IngredientUpdateObject = {
    recipeIngredientId: number
    amount?: number
    unit?: string | null
    name?: string
}

export async function createRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    return recipeService.createRecipes(
        recipes.map((recipe) => ({
            name: recipe.name,
            description: recipe.description,
            peopleCount: recipe.peopleCount,
            prepareTime: recipe.prepareTime,
        }))
    )
}

export async function updateRecipe(
    recipe: Recipe,
    oldRecipe: Recipe
): Promise<Recipe> {
    const recipeObj: RecipeUpdateObject = {}
    if (recipe.name !== oldRecipe.name) recipeObj.name = recipe.name
    if (recipe.description !== oldRecipe.description)
        recipeObj.description = recipe.description
    if (recipe.peopleCount !== oldRecipe.peopleCount)
        recipeObj.peopleCount = recipe.peopleCount
    if (recipe.prepareTime !== oldRecipe.prepareTime)
        recipeObj.prepareTime = recipe.prepareTime

    if (Object.keys(recipeObj).length > 0) {
        return recipeService.updateRecipe(recipe.id, recipeObj)
    }
    return recipe
}

export async function getMyRecipes(): Promise<Recipe[]> {
    return recipeService.getMyRecipes()
}

export async function deleteRecipe(recipeId: number): Promise<void> {
    await recipeService.deleteRecipe(recipeId)
}

export async function addIngredients(
    recipeId: number,
    ingredients: RecipeIngredient[]
): Promise<RecipeIngredient[]> {
    return recipeService.addIngredients(
        recipeId,
        ingredients.map((ri) => ({
            amount: ri.amount,
            unit:
                ri.ingredient!.unit?.length === 0 ? null : ri.ingredient!.unit,
            name: ri.ingredient!.name,
        }))
    )
}

export async function updateIngredients(
    recipeId: number,
    ingredients: RecipeIngredient[],
    oldIngredients: RecipeIngredient[]
): Promise<RecipeIngredient[]> {
    const updateObjects: IngredientUpdateObject[] = []
    ingredients.forEach((ingr) => {
        const obj: IngredientUpdateObject = { recipeIngredientId: ingr.id }
        const oldIngr = oldIngredients.find((i) => i.id === ingr.id)
        if (typeof oldIngr !== 'undefined') {
            if (oldIngr.amount !== ingr.amount) obj.amount = ingr.amount
            if (oldIngr.ingredient!.unit !== ingr.ingredient!.unit)
                obj.unit = ingr.ingredient!.unit
            if (oldIngr.ingredient!.name !== ingr.ingredient!.name)
                obj.name = ingr.ingredient!.name
        }

        if (Object.keys(obj).length > 1) updateObjects.push(obj)
    })

    return recipeService.updateIngredients(recipeId, updateObjects)
}

export async function removeIngredients(
    recipeId: number,
    ingredients: RecipeIngredient[]
): Promise<void> {
    await recipeService.removeIngredients(
        recipeId,
        ingredients.map((i) => i.ingredient!.id)
    )
}

export async function addInstructions(
    recipeId: number,
    instructions: Instruction[]
): Promise<Instruction[]> {
    return recipeService.addInstructions(
        recipeId,
        instructions.map((i) => ({ text: i.text }))
    )
}

export async function updateInstructions(
    recipeId: number,
    instructions: Instruction[]
): Promise<Instruction[]> {
    return recipeService.updateInstructions(
        recipeId,
        instructions.map((i) => ({ text: i.text, instructionId: i.id }))
    )
}

export async function deleteInstructions(
    recipeId: number,
    instructions: Instruction[]
): Promise<void> {
    await recipeService.deleteInstructions(
        recipeId,
        instructions.map((i) => i.id)
    )
}
