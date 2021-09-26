import { Dispatch } from 'redux'
import { AUTH_ACTIONS, BROWSE_RECIPE_ACTIONS,
    INITIALIZATION_ACTIONS } from '@/reducers'
import { recipeService } from '@/services'
import { GetRecipeParams } from '@/services/recipe'
import { handleAPIError } from '@/config/routes'
import { retrieveUserData } from './user'
import { retrieveRecipes } from './my-recipes'
import { getRecipes} from './browse-recipes'

export const initialize =
    (navigation: any): any =>
    async (dispatch: Dispatch) => {

        try {
            await dispatch(retrieveUserData())
            await dispatch(retrieveRecipes(navigation) as any)
            await dispatch(getRecipes({
                scopes: ['published'],
                sort: ['publishtime'],
            }) as any)

            // Finally dispatch initialized
            dispatch({
                type: INITIALIZATION_ACTIONS.DONE,
                payload: {}
            })

        } catch (err: any) {
            handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR
            )
        }

    }


export const reset =
    (): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: INITIALIZATION_ACTIONS.RESET,
            payload: {}
        })
    }
