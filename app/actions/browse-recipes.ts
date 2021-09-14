import { Dispatch } from 'redux'
import * as recipeService from '../services/recipe'
import { BROWSE_RECIPE_ACTIONS } from '../reducers/browse'

export const getRecipes =
    (params: recipeService.GetRecipeParams) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type: BROWSE_RECIPE_ACTIONS.RECIPES_START,
        })
        try {
            const paginationObject = await recipeService.getRecipes(params)

            dispatch({
                type: BROWSE_RECIPE_ACTIONS.GET_RECIPES_SUCCES,
                payload: {
                    newRecipes: paginationObject.data,
                    nextPage: paginationObject.next_page,
                    currentParams: params,
                },
            })
        } catch (err: any) {
            dispatch({
                type: BROWSE_RECIPE_ACTIONS.RECIPES_ERROR,
            })
        }
    }

export const addRecipes =
    (params: recipeService.GetRecipeParams) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type: BROWSE_RECIPE_ACTIONS.RECIPES_START,
        })
        try {
            const paginationObject = await recipeService.getRecipes(params)
            dispatch({
                type: BROWSE_RECIPE_ACTIONS.ADD_RECIPES_SUCCES,
                payload: {
                    newRecipes: paginationObject.data,
                    nextPage: paginationObject.next_page,
                },
            })
        } catch (err: any) {
            dispatch({
                type: BROWSE_RECIPE_ACTIONS.RECIPES_ERROR,
            })
        }
    }
