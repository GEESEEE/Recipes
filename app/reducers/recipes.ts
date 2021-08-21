import Recipe from '../data/recipe'

export const RECIPE_ACTIONS = {
    ADD_RECIPE: 'addRecipe',
    SET_RECIPES: 'setRecipes',
    DELETE_RECIPE: 'deleteRecipe',
}

const initialState: Recipe[] = []

const recipes = (
    state = initialState,
    action: { type: string; payload: any }
): Recipe[] => {
    switch (action.type) {
        case RECIPE_ACTIONS.SET_RECIPES: {
            const { newRecipes } = action.payload
            return newRecipes
        }

        case RECIPE_ACTIONS.ADD_RECIPE: {
            const { newRecipe } = action.payload
            return [...state, newRecipe]
        }

        case RECIPE_ACTIONS.DELETE_RECIPE: {
            const { recipe } = action.payload
            return state.filter((r) => r.id !== recipe.id)
        }

        default:
            return state
    }
}

export default recipes
