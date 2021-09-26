import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { SETTINGS_ACTIONS, USER_ACTIONS } from '@/reducers'
import { userService } from '@/services'

export const retrieveUserData = (): any => async (dispatch: Dispatch) => {
    console.log("Retrieving User Data")
    dispatch({ type: USER_ACTIONS.GET_USER_START, payload: {} })
    try {
        const token = await SecureStore.getItemAsync('token')
        console.log("Token", token)
        if (token) {
            const user = await userService.getUser({ token })

            dispatch({
                type: SETTINGS_ACTIONS.SET_SETTINGS,
                payload: {
                    invertedColors: user.settings?.invertedColors,
                    color: user.settings?.color,
                    newTheme: user.settings?.theme,
                },
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
