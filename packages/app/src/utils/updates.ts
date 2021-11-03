import {
    SectionUpdate,
    Section,
    RecipeIngredient,
    RecipeIngredientCreate,
    InstructionCreate,
    Instruction,
    RecipeCreate,
    Recipe,
} from '@recipes/api-types/v1'
import { ListItem } from '@/types'

export function getNewPosition(list: ListItem[], last = true): number {
    if (list.length === 0) {
        return 1
    }
    const sorted = [...list].sort((i1, i2) => i1.position - i2.position)

    if (last) {
        return sorted[sorted.length - 1].position + 1
    } else {
        return sorted[0].position - 1
    }
}

export function getNewId(list: ListItem[]): number {
    if (list.length === 0) {
        return 1
    }
    const sorted = [...list].sort((i1, i2) => i1.id - i2.id)
    return sorted[0].id - 1
}

export function sectionUpdateObject(
    old: Section,
    newObject: Section
): SectionUpdate {
    const update: SectionUpdate = { id: old.id }
    if (old.name !== newObject.name) update.name = newObject.name
    if (old.description !== newObject.description)
        update.description = newObject.description
    if (old.position !== newObject.position)
        update.position = newObject.position
    return update
}

export function recipeCreateObject(recipe: Recipe): RecipeCreate {
    return {
        name: recipe.name,
        description: recipe.description,
        peopleCount: recipe.peopleCount,
        prepareTime: recipe.prepareTime,
        position: recipe.position,
    }
}

export function ingredientCreateObjects(
    ingredients: RecipeIngredient[]
): RecipeIngredientCreate[] {
    return ingredients.map((ingr) => {
        let unit = ingr.ingredient.unit
        if (typeof unit === 'string' && unit.length === 0) {
            unit = null
        }
        console.log('Unit', unit)
        return {
            amount: ingr.amount,
            position: ingr.position,
            name: ingr.ingredient.name,
            unit,
        }
    })
}

export function instructionCreateObjects(
    instructions: Instruction[]
): InstructionCreate[] {
    return instructions.map((instr) => ({
        text: instr.text,
        position: instr.position,
    }))
}
