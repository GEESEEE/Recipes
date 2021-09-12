import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { THEME_ACTIONS } from '../reducers/theme'

export const retrieveTheme =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const theme = await AsyncStorage.getItem('theme')
            if (theme) {
                dispatch({
                    type: THEME_ACTIONS.SET_THEME,
                    payload: theme,
                })
            }
        } catch (err: any) {
            console.log(err.message)
            console.error(err)
        }
    }

export const setTheme =
    (lightTheme: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const theme = lightTheme ? 'light' : 'dark'
            dispatch({
                type: THEME_ACTIONS.SET_THEME,
                payload: theme,
            })
            await AsyncStorage.setItem('theme', theme)
        } catch (err: any) {
            console.log(err.message)
            console.error(err)
        }
    }

export const retrieveColor =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const color = await AsyncStorage.getItem('color')
            if (color) {
                dispatch({
                    type: THEME_ACTIONS.SET_COLOR,
                    payload: color,
                })
            }
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
                type: THEME_ACTIONS.SET_COLOR,
                payload: color,
            })
            await AsyncStorage.setItem('color', color)
        } catch (err: any) {
            console.log(err.message)
            console.error(err)
        }
    }
