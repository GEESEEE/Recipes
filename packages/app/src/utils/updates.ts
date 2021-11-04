import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
    SectionUpdate,
    Section,
    RecipeIngredient,
    RecipeIngredientCreate,
    InstructionCreate,
    Instruction,
    RecipeCreate,
    Recipe,
    RecipeUpdate,
    RecipeIngredientUpdate,
    InstructionUpdate,
} from '@recipes/api-types/v1'
import { sortPosition } from './utils'
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
    const lowestId = sorted[0].id
    return lowestId > 0 ? 0 : sorted[0].id - 1
}

export function getListItemChanges<
    T extends ListItem,
    C extends Partial<T>,
    U extends { id: number }
>(
    oldArr: T[],
    newArr: T[],
    getCreateObject: (item: T[]) => C[],
    getUpdateObject: (obj1: T, obj2: T) => U
): [Array<T>, Array<C>, Array<U>, Array<number>] {
    const toAdd: Array<C> = []
    const toUpdate: Array<U> = []
    const toDelete: Array<number> = []

    // If id <= 0 only exists locally, so add to db
    newArr.forEach((item) => {
        if (item.id <= 0) toAdd.push(getCreateObject([item])[0])
    })
    oldArr.forEach((oldItem) => {
        let toRemove = true
        newArr.forEach((newItem) => {
            // If id is the same or id <= 0, dont delete
            if (oldItem.id === newItem.id || oldItem.id <= 0) toRemove = false

            // if id is the same and any property has changed, add to update list
            if (oldItem.id === newItem.id) {
                const updateObj = getUpdateObject(oldItem, newItem)
                if (Object.keys(updateObj).length > 1) {
                    toUpdate.push(updateObj)
                }
            }
        })
        if (toRemove) toDelete.push(oldItem.id)
    })
    const changedIds = [...toUpdate.map((item) => item.id), ...toDelete]
    const unchanged = oldArr.filter(
        (item) => changedIds.indexOf(item.id) === -1
    )
    console.log(
        'unChanged',
        unchanged,
        'Toadd',
        toAdd,
        'ToUpdate',
        toUpdate,
        'ToDelete',
        toDelete
    )
    return [unchanged, toAdd, toUpdate, toDelete]
}

type BaseArg = { sectionId: number; recipeId: number }

export async function getNewListItems<
    T extends ListItem,
    C extends Partial<T>,
    U extends { id: number }
>(
    baseArgs: BaseArg,
    changeLists: [Array<C>, Array<U>, Array<number>],
    addItems: (
        args: BaseArg & { body: C[] }
    ) => Promise<QueryReturnValue<Array<T>, any>>,
    updateItems: (
        args: BaseArg & { body: U[] }
    ) => Promise<QueryReturnValue<Array<T>, any>>,
    deleteItems: (
        args: BaseArg & { body: number[] }
    ) => Promise<QueryReturnValue<boolean[], any>>
): Promise<T[]> {
    const [toAdd, toUpdate, toDelete] = changeLists
    const newItems: T[] = []
    if (toAdd.length > 0) {
        const addedItems = await addItems({
            ...baseArgs,
            body: toAdd,
        })
        if ('data' in addedItems) {
            newItems.push(...(addedItems.data as T[]))
        }
    }

    if (toUpdate.length > 0) {
        const updatedItems = await updateItems({
            ...baseArgs,
            body: toUpdate,
        })
        if ('data' in updatedItems) {
            newItems.push(...(updatedItems.data as T[]))
        }
    }

    if (toDelete.length > 0) {
        await deleteItems({
            ...baseArgs,
            body: toDelete,
        })
    }
    return sortPosition(newItems)
}

// Create objects
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

// Update objects
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

export function recipeUpdateObject(
    old: Recipe,
    newObject: Recipe
): RecipeUpdate {
    const update: RecipeUpdate = { id: old.id }
    if (old.name !== newObject.name) update.name = newObject.name
    if (old.description !== newObject.description)
        update.description = newObject.description
    if (old.prepareTime !== newObject.prepareTime)
        update.prepareTime = newObject.prepareTime
    if (old.peopleCount !== newObject.peopleCount)
        update.peopleCount = newObject.peopleCount
    if (old.position !== newObject.position)
        update.position = newObject.position
    return update
}

export function ingredientUpdateObject(
    old: RecipeIngredient,
    newObject: RecipeIngredient
): RecipeIngredientUpdate {
    const update: RecipeIngredientUpdate = { id: old.id }
    if (old.ingredient.name !== newObject.ingredient.name)
        update.name = newObject.ingredient.name
    if (old.ingredient.unit !== newObject.ingredient.unit)
        update.unit = newObject.ingredient.unit
    if (old.amount !== newObject.amount) update.amount = newObject.amount
    if (old.position !== newObject.position)
        update.position = newObject.position
    return update
}

export function instructionUpdateObject(
    old: Instruction,
    newObject: Instruction
): InstructionUpdate {
    const update: InstructionUpdate = { id: old.id }
    if (old.text !== newObject.text) update.text = newObject.text
    if (old.position !== newObject.position)
        update.position = newObject.position
    return update
}
