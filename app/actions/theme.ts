import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import {THEME_ACTIONS} from '../reducers/theme'

export const retrieveTheme = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        const theme = await SecureStore.getItemAsync('theme')
        if (theme) {
            dispatch({
                type: THEME_ACTIONS.SET_THEME,
                payload: theme
            })
        }
    } catch (err) {
        console.log(err.message)
        console.error(err)
    }
}

export const setTheme = (darkTheme: boolean) => async (dispatch: Dispatch): Promise<void> => {
    try {
        const theme = darkTheme ? 'dark' : 'light'
        dispatch({
            type: THEME_ACTIONS.SET_THEME,
            payload: theme
        })
        await SecureStore.setItemAsync('theme', theme)
    } catch (err) {
        console.log(err.message)
        console.error(err)
    }
}
