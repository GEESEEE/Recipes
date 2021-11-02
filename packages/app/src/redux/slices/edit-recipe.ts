import { stat } from 'fs/promises'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    Recipe,
    RecipeIngredient,
    Ingredient,
    Instruction,
} from '@recipes/api-types/v1'
import maxBy from 'lodash/maxBy'

type Id = { id: number }

const editRecipeSlice = createSlice({
    name: 'editRecipe',
    initialState: new Recipe(),
    reducers: {
        // Recipe State
        setRecipe(state, action: PayloadAction<Recipe>) {
            state = action.payload
        },

        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        setPrepareTime(state, action: PayloadAction<number>) {
            state.prepareTime = action.payload
        },
        setPeopleCount(state, action: PayloadAction<number>) {
            state.peopleCount = action.payload
        },

        // Ingredients State
        addIngredient(state, action: PayloadAction<Id>) {
            const { id } = action.payload
            const ingredient = new RecipeIngredient(id)
            const oldIngredients = state.recipeIngredients
            const maxPosition = maxBy(oldIngredients, 'position')?.position
            const position = maxPosition ? maxPosition + 1 : 1
            ingredient.position = position

            state.recipeIngredients = [...oldIngredients, ingredient]
        },
        removeIngredient(state, action: PayloadAction<Id>) {
            const { id } = action.payload
            state.recipeIngredients = state.recipeIngredients.filter(
                (ingr) => ingr.id !== id
            )
        },
        setIngredientName(state, action: PayloadAction<Id & { name: string }>) {
            const { id, name } = action.payload
            const ingredient = state.recipeIngredients.find(
                (ingr) => ingr.id === id
            )
            if (typeof ingredient !== 'undefined') {
                ingredient.ingredient.name = name
                state.recipeIngredients = mapIngredient(state, ingredient)
            }
        },
        setIngredientAmount(
            state,
            action: PayloadAction<Id & { amount: number }>
        ) {
            const { id, amount } = action.payload
            const ingredient = state.recipeIngredients.find(
                (ingr) => ingr.id === id
            )
            if (typeof ingredient !== 'undefined') {
                ingredient.amount = amount
                state.recipeIngredients = mapIngredient(state, ingredient)
            }
        },
        setIngredientUnit(
            state,
            action: PayloadAction<Id & { unit: string | null }>
        ) {
            const { id, unit } = action.payload
            const ingredient = state.recipeIngredients.find(
                (ingr) => ingr.id === id
            )
            if (typeof ingredient !== 'undefined') {
                ingredient.ingredient.unit = unit
                state.recipeIngredients = mapIngredient(state, ingredient)
            }
        },

        // Instruction State
        addInstruction(state, action: PayloadAction<Id>) {
            const { id } = action.payload
            const instruction = new Instruction(id)
            const oldInstructions = state.instructions
            const maxPosition = maxBy(oldInstructions, 'position')?.position
            const position = maxPosition ? maxPosition + 1 : 1
            instruction.position = position

            state.instructions = [...oldInstructions, instruction]
        },
        removeInstruction(state, action: PayloadAction<Id>) {
            const { id } = action.payload
            state.instructions = state.instructions.filter(
                (instr) => instr.id !== id
            )
        },
        setInstructionText(
            state,
            action: PayloadAction<Id & { text: string }>
        ) {
            const { id, text } = action.payload
            const instruction = state.instructions.find(
                (instr) => instr.id === id
            )
            if (typeof instruction !== 'undefined') {
                instruction.text = text
                state.instructions = mapInstruction(state, instruction)
            }
        },
    },
})

function mapIngredient(
    state: Recipe,
    ingredient: RecipeIngredient
): RecipeIngredient[] {
    return state.recipeIngredients.map((ingr) => {
        if (ingr.id === ingredient.id) {
            return ingredient
        }
        return ingr
    })
}

function mapInstruction(
    state: Recipe,
    instruction: Instruction
): Instruction[] {
    return state.instructions.map((instr) => {
        if (instr.id === instruction.id) {
            return instruction
        }
        return instr
    })
}
