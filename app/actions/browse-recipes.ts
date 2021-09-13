import { Dispatch } from 'redux'
import * as recipeService from '../services/recipe'
import { BROWSE_RECIPE_ACTIONS } from '../reducers/browse'

export const getRecipes =
    ({
        scopes,
        search,
        sort,
        page,
        perPage
    }: recipeService.GetRecipeParams) =>
    async (dispatch: Dispatch): Promise<void> => {
        const paginationObject = await recipeService.getRecipes({
            scopes,
            search,
            sort,
            page,
            perPage
        })
        const { from,
            to,
            per_page,
            total,
            current_page,
            prev_page,
            next_page,
            last_page,
        } = paginationObject
        console.log("New Recipes", from,
        to,
        per_page,
        total,
        current_page,
        prev_page,
        next_page,
        last_page,)

        dispatch({
            type: BROWSE_RECIPE_ACTIONS.SET_RECIPES,
            payload: { newRecipes: paginationObject.data },
        })
    }
