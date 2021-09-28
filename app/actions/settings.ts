import { Dispatch } from 'redux'
import { SETTINGS_ACTIONS } from '../reducers/settings'
import * as userService from '../services/user'

export const setInvertedColors =
    (invertedColors: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch({
                type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
                payload: { invertedColors },
            })
            await userService.updateSettings({ invertedColors })
        } catch (err: any) {
            console.error(err)
        }
    }

export const setTheme =
    (lightTheme: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const theme = lightTheme ? 'light' : 'dark'
            dispatch({
                type: SETTINGS_ACTIONS.SET_THEME,
                payload: { newTheme: theme },
            })
            await userService.updateSettings({ theme })
        } catch (err: any) {
            console.log(err.message)
            console.error(err)
        }
    }

export const setColor =
    (color: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch({
                type: SETTINGS_ACTIONS.SET_COLOR,
                payload: { color },
            })
            await userService.updateSettings({ color })
        } catch (err: any) {
            console.log(err.message)
            console.error(err)
        }
    }
