import { Recipe } from '../data'

export const MY_RECIPE_ACTIONS = {
    ADD_RECIPE: 'addMyRecipe',
    SET_RECIPES: 'setMyRecipes',
    DELETE_RECIPE: 'deleteMyRecipe',
    EDIT_RECIPE: 'editMyRecipe',
}

const initialState: Recipe[] = []

const myRecipes = (
    state = initialState,
    action: { type: string; payload: any }
): Recipe[] => {
    switch (action.type) {
        case MY_RECIPE_ACTIONS.SET_RECIPES: {
            const { newRecipes } = action.payload
            return newRecipes
        }

        case MY_RECIPE_ACTIONS.ADD_RECIPE: {
            const { newRecipe } = action.payload
            return [...state, newRecipe]
        }

        case MY_RECIPE_ACTIONS.DELETE_RECIPE: {
            const { recipe } = action.payload
            return state.filter((r) => r.id !== recipe.id)
        }

        case MY_RECIPE_ACTIONS.EDIT_RECIPE: {
            const { newRecipe } = action.payload
            const newerRecipe = JSON.parse(JSON.stringify(newRecipe))
            return state.map((r) => (r.id === newerRecipe.id ? newerRecipe : r))
        }

        default:
            return state
    }
}

export default myRecipes
