import { Dispatch } from 'redux'
import * as recipeService from '../services/recipe'
import { BROWSE_RECIPE_ACTIONS } from '../reducers/browse'
import { Scope } from '../services/recipe'

export const getRecipes =
    ({
        scopes,
        search,
        sort,
    }: {
        scopes: Scope[]
        search?: string[]
        sort?: string[]
    }) =>
    async (dispatch: Dispatch): Promise<void> => {
        const newRecipes = await recipeService.getRecipes({
            scopes,
            search,
            sort,
        })

        dispatch({
            type: BROWSE_RECIPE_ACTIONS.SET_RECIPES,
            payload: { newRecipes },
        })
    }
