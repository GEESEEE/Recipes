import { Dispatch } from 'redux'
import * as recipeService from '../rest/recipe'
import {BROWSE_RECIPE_ACTIONS} from '../reducers/browse-recipes'
import {Scope} from '../rest/recipe'

export const getRecipes = (scopes: Scope[], search?: string) =>
async (dispatch: Dispatch): Promise<void> => {
    const newRecipes = await recipeService.getRecipes({scopes, search})

    dispatch({
        type: BROWSE_RECIPE_ACTIONS.SET_RECIPES,
        payload: { newRecipes }
    })

}
