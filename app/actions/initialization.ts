import { Dispatch } from 'redux'
import { INITIALIZATION_ACTIONS } from '@/reducers'

export const initialize =
    (navigation: any, callback: () => Promise<void>): any =>
    async (dispatch: Dispatch) => {
        // All the functions below should be called here
        // dispatch(userActions.retrieveUserData())
        // dispatch(myRecipeActions.retrieveRecipes(navigation))
        // dispatch(
        //     browseRecipeActions.getRecipes({
        //         scopes: ['published'],
        //         sort: ['publishtime'],
        //     })
        // )
        await callback()
        navigation.navigate('Main')
        dispatch({
            type: INITIALIZATION_ACTIONS.DONE,
            payload: {}
        })

    }
