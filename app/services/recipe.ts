import * as recipeService from '../rest/recipe'
import { Instruction, Recipe, RecipeIngredient } from '../data'

type RecipeUpdateObject = {
    name?: string
    description?: string
    peopleCount?: number
    prepareTime?: number
    publishedAt?: Date | null
}

type IngredientUpdateObject = {
    recipeIngredientId: number
    amount?: number
    position?: number
    unit?: string | null
    name?: string
}

type InstructionUpdateObject = {
    instructionId: number
    text?: string
    position?: number
}

export async function createRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    return recipeService.createRecipes(
        recipes.map((recipe) => ({
            name: recipe.name,
            description: recipe.description,
            peopleCount: recipe.peopleCount,
            prepareTime: recipe.prepareTime,
            publishedAt: recipe.publishedAt,
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
    if (Boolean(recipe.publishedAt) !== Boolean(oldRecipe.publishedAt))
        recipeObj.publishedAt = recipe.publishedAt

    if (Object.keys(recipeObj).length > 0) {
        return recipeService.updateRecipe(recipe.id, recipeObj)
    }
    // Deepcopy input recipe if nothing changed, so will always be a new Recipe than what was put in
    return JSON.parse(JSON.stringify(recipe))
}

export async function getMyRecipes(): Promise<Recipe[]> {
    return recipeService.getRecipes({
        scopes: ['author']
    })
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
            position: ri.position,
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
            if (oldIngr.position !== ingr.position) obj.position = ingr.position
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
        instructions.map((i) => ({ text: i.text, position: i.position }))
    )
}

export async function updateInstructions(
    recipeId: number,
    instructions: Instruction[],
    oldInstructions: Instruction[]
): Promise<Instruction[]> {
    const updateObjects: InstructionUpdateObject[] = []
    instructions.forEach((instr) => {
        const obj: InstructionUpdateObject = { instructionId: instr.id }
        const oldInstr = oldInstructions.find((i) => i.id === instr.id)
        if (typeof oldInstr !== 'undefined') {
            if (oldInstr.text !== instr.text) obj.text = instr.text
            if (oldInstr.position !== instr.position)
                obj.position = instr.position
        }
        if (Object.keys(obj).length > 1) updateObjects.push(obj)
    })

    return recipeService.updateInstructions(recipeId, updateObjects)
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
