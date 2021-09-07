import { Recipe } from '../data'

export const BROWSE_RECIPE_ACTIONS = {
    ADD_RECIPES: 'addRecipes',
    SET_RECIPES: 'setRecipes',

}

const initialState: Recipe[] = []

const browseRecipes = (
    state = initialState,
    action: { type: string; payload: any }
): Recipe[] => {
    switch (action.type) {
        case BROWSE_RECIPE_ACTIONS.SET_RECIPES: {
            const { newRecipes } = action.payload
            return newRecipes
        }

        case BROWSE_RECIPE_ACTIONS.ADD_RECIPES: {
            const { newRecipes } = action.payload
            return [...state, ...newRecipes]
        }


        default:
            return state
    }
}

export default browseRecipes
