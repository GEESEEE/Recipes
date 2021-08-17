import { Dispatch } from 'redux'
import { USERACTIONS } from '../reducers/user'
import * as userService from '../services/user'

export const getUserData =
    (token: string): any =>
    async (dispatch: Dispatch) => {
        try {
            const user = await userService.getUser({ token })
            dispatch({ type: USERACTIONS.GET_USER_SUCCES, payload: user })
        } catch (err) {
            console.error(err)
            dispatch({
                type: USERACTIONS.GET_USER_ERROR,
                payload: { error: err.message },
            })
        }
    }

export const clearUserData = (): any => async (dispatch: Dispatch) => {
    dispatch({ type: USERACTIONS.CLEAR_USER, payload: {} })
}
