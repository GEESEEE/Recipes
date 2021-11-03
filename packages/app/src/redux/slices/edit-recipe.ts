import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    Recipe,
    RecipeIngredient,
    Instruction,
    InstructionUpdate,
    RecipeIngredientUpdate,
} from '@recipes/api-types/v1'
import { getNewId, getNewPosition } from '@/utils'

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

type Id = { id: number }

const initialState: Recipe = { ...new Recipe() }

const editRecipeSlice = createSlice({
    name: 'editRecipe',
    initialState,
    reducers: {
        // Recipe State
        setRecipe(_, action: PayloadAction<Recipe>) {
            return action.payload
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
        addIngredient(state, action: PayloadAction<RecipeIngredient>) {
            const ingredient = action.payload
            const oldIngredients = state.recipeIngredients
            ingredient.position = getNewPosition(oldIngredients)
            state.recipeIngredients = [...oldIngredients, ingredient]
        },
        updateIngredients(
            state,
            action: PayloadAction<RecipeIngredientUpdate[]>
        ) {
            state.recipeIngredients = state.recipeIngredients.map((oldIngr) => {
                const newIngr = action.payload.find((i) => i.id === oldIngr.id)
                if (typeof newIngr === 'undefined') {
                    return oldIngr
                }
                return { ...oldIngr, ...newIngr }
            })
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
        addInstruction(state, action: PayloadAction<Instruction>) {
            const instruction = action.payload
            const oldInstructions = state.instructions
            const position = getNewPosition(oldInstructions)
            instruction.position = position
            state.instructions = [...oldInstructions, instruction]
        },
        updateInstructions(state, action: PayloadAction<InstructionUpdate[]>) {
            state.instructions = state.instructions.map((oldInstr) => {
                const newInstr = action.payload.find(
                    (i) => i.id === oldInstr.id
                )
                if (typeof newInstr === 'undefined') {
                    return oldInstr
                }
                return { ...oldInstr, ...newInstr }
            })
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

export const editRecipeActions = editRecipeSlice.actions
export const editRecipeReducer = editRecipeSlice.reducer
