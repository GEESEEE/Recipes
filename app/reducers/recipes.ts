import Recipe from '../data/recipe'

export const RECIPEACTIONS = {
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
        case RECIPEACTIONS.SET_RECIPES: {
            const { newRecipes } = action.payload
            return newRecipes
        }

        case RECIPEACTIONS.ADD_RECIPE: {
            const { recipe } = action.payload
            return [...state, recipe]
        }

        case RECIPEACTIONS.DELETE_RECIPE: {
            const { recipe } = action.payload
            return state.filter((r) => r.key !== recipe.key)
        }

        default:
            return state
    }
}

export default recipes
