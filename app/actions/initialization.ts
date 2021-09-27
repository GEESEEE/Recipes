import { Dispatch } from 'redux'
import { AUTH_ACTIONS, BROWSE_RECIPE_ACTIONS,
    INITIALIZATION_ACTIONS } from '@/reducers'
import { recipeService } from '@/services'
import { GetRecipeParams } from '@/services/recipe'
import { handleAPIError } from '@/config/routes'
import { retrieveUserData } from './user'
import { retrieveRecipes } from './my-recipes'
import { getRecipes} from './browse-recipes'


export const reset =
    (): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: INITIALIZATION_ACTIONS.RESET,
            payload: {}
        })
    }
