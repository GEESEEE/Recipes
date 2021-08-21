export const INDICES_ACTIONS = {
    SET_RECIPE_ID: 'decrementRecipe',
    SET_INGREDIENT_ID: 'decrementIngredient',
    SET_INSTRUCTION_ID: 'decrementInstruction',
    SET_STATE: 'setState',
}

export type Indices = {
    recipeId: number
    instructionId: number
    ingredientId: number
}

const initialState: Indices = {
    recipeId: 0,
    instructionId: 0,
    ingredientId: 0,
}

const indices = (
    state = initialState,
    action: { type: string; payload: any }
): Indices => {
    switch (action.type) {
        case INDICES_ACTIONS.SET_STATE: {
            return action.payload
        }

        case INDICES_ACTIONS.SET_RECIPE_ID: {
            const { recipeId } = action.payload
            return { ...state, recipeId }
        }

        case INDICES_ACTIONS.SET_INGREDIENT_ID: {
            const { ingredientId } = action.payload
            return { ...state, ingredientId }
        }

        case INDICES_ACTIONS.SET_INSTRUCTION_ID: {
            const { instructionId } = action.payload
            return { ...state, instructionId }
        }

        default:
            return state
    }
}

export default indices
