import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { SETTINGS_ACTIONS } from '../reducers/settings'
import { THEME_ACTIONS } from '../reducers/theme'
import { USER_ACTIONS } from '../reducers/user'
import * as userService from '../services/user'

export const retrieveUserData = (): any => async (dispatch: Dispatch) => {
    dispatch({ type: USER_ACTIONS.GET_USER_START, payload: {} })
    try {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const user = await userService.getUser({ token })

            dispatch({
                type: THEME_ACTIONS.INITIALIZE_THEME,
                payload: {
                    color: user.settings?.color,
                    newTheme: user.settings?.theme,
                },
            })
            dispatch({
                type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
                payload: { invertedColors: user.settings?.invertedColors },
            })
            dispatch({ type: USER_ACTIONS.GET_USER_SUCCES, payload: user })
        }
    } catch (err: any) {
        console.error(err)
        dispatch({
            type: USER_ACTIONS.GET_USER_ERROR,
            payload: { error: err.message },
        })
    }
}

export const clearUserData = (): any => async (dispatch: Dispatch) => {
    dispatch({ type: USER_ACTIONS.CLEAR_USER, payload: {} })
}
