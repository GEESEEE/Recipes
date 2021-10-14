import { createSlice } from '@reduxjs/toolkit'
import { colors, themeUtils } from '@/config'
import { Typography } from '@/styles'
import { privateAuthActions }from './auth'
import { AppDispatch } from '../store'
import { userService } from '@/services'

export interface Settings {
    invertedColors: boolean
    textSize: Typography.TextSize
    theme: themeUtils.Theme
}

const initialState: Settings = {
    invertedColors: false,
    textSize: 'm',
    theme: themeUtils.darkTheme(),
}

function getTheme(theme: string): themeUtils.Theme {
    return theme === 'dark' ? themeUtils.darkTheme() : themeUtils.lightTheme()
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setInvertedColors(state, action) {
            state.invertedColors = action.payload
        },
        setTheme(state, action) {
            state.theme = getTheme(action.payload)
        },
        setColor(state, action) {
            const color = action.payload
            colors.primary = color
            state.theme = {...state.theme, primary: color}
        },
        setTextSize(state, action) {
            state.textSize = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(privateAuthActions.login, (state, action) => {
            console.log("Settings login", action.payload.settings)
            const { color, invertedColors, theme} = action.payload.settings
            colors.primary = color
            state.theme = { ...getTheme(theme), primary: color}
            state.invertedColors = invertedColors
        })
        builder.addCase(privateAuthActions.logout, () => {
            colors.primary = colors.primaryBlue
            return initialState
        })
    }
})

const { actions } = settingsSlice

export const privateSettingsActions = actions

const setInvertedColors =
    (invertedColors: boolean) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(actions.setInvertedColors(invertedColors))
            await userService.updateSettings({ invertedColors })
        } catch (err: any) {
            console.error(err)
        }
    }

const setTheme =
    (lightTheme: boolean) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            const theme = lightTheme ? 'light' : 'dark'
            dispatch(actions.setTheme(theme))
            await userService.updateSettings({ theme })
        } catch (err: any) {
            console.error(err)
        }
    }

const setColor =
    (color: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(actions.setColor(color))
            await userService.updateSettings({ color })
        } catch (err: any) {
            console.error(err)
        }
    }

export const settingsActions = {
    setColor, setInvertedColors, setTheme
}

export default settingsSlice.reducer
