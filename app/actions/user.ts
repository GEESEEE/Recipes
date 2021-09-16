import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { SETTINGS_ACTIONS } from '../reducers/settings'
import { THEME_ACTIONS } from '../reducers/theme'
import { USERACTIONS } from '../reducers/user'
import * as userService from '../services/user'

export const retrieveUserData =
    (): any =>
    async (dispatch: Dispatch) => {
        dispatch({ type: USERACTIONS.GET_USER_START, payload: {} })
        try {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                const user = await userService.getUser({ token })
                console.log(user)
                dispatch({ type: THEME_ACTIONS.SET_COLOR, payload: user.settings?.color })
                dispatch({ type: THEME_ACTIONS.SET_THEME, payload: user.settings?.theme })
                dispatch({
                    type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
                    payload: { invertedColors: user.settings?.invertedColors}
                })
                dispatch({ type: USERACTIONS.GET_USER_SUCCES, payload: user })
            }
        } catch (err: any) {
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
