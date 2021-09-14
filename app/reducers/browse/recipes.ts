import { Recipe } from '../../data'
import { GetRecipeParams } from '../../services/recipe'

export const BROWSE_RECIPE_ACTIONS = {
    RECIPES_START: 'addBrowseRecipesStart',
    ADD_RECIPES_SUCCES: 'addBrowseRecipesSucces',
    GET_RECIPES_SUCCES: 'getBrowseRecipesSucces',
    RECIPES_ERROR: 'addBrowseRecipesError',

}

interface BrowseRecipeState {
    recipes: Recipe[]
    currentParams: GetRecipeParams
    nextPage: number | null
    loading: boolean
}

const initialState: BrowseRecipeState = {
    recipes: [],
    currentParams: {},
    nextPage: null,
    loading: false,
}

const browseRecipes = (
    state = initialState,
    action: { type: string; payload: any }
): BrowseRecipeState => {
    switch (action.type) {
        case BROWSE_RECIPE_ACTIONS.RECIPES_START: {
            return {...state, loading: true}
        }

        case BROWSE_RECIPE_ACTIONS.GET_RECIPES_SUCCES: {
            const { newRecipes, nextPage, currentParams } = action.payload
            return { loading: false, recipes: newRecipes, nextPage, currentParams }
        }

        case BROWSE_RECIPE_ACTIONS.ADD_RECIPES_SUCCES: {
            const { newRecipes, nextPage } = action.payload
            // Check if some recipes already exist, in case new recipes are published between adding
            const currentIds = state.recipes.map(r => r.id)
            const actualNewRecipes = newRecipes.filter((r: Recipe) => !currentIds.includes(r.id))

            const recipes = [...state.recipes, ...actualNewRecipes]
            return { ...state, recipes, nextPage, loading:false }
        }

        case BROWSE_RECIPE_ACTIONS.RECIPES_ERROR: {
            return {...state, loading: false}
        }

        default:
            return state
    }
}

export default browseRecipes
