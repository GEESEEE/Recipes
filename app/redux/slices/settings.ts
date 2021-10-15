import { createSlice } from '@reduxjs/toolkit'
import { colors, themeUtils } from '@/utils'
import { Typography } from '@/styles'
import { privateAuthActions } from './auth'

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
            state.theme = { ...state.theme, primary: color }
        },
        setTextSize(state, action) {
            state.textSize = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(privateAuthActions.login, (state, action) => {
            const { user } = action.payload
            const { color, invertedColors, theme } = user.settings
            colors.primary = color
            state.theme = { ...getTheme(theme), primary: color }
            state.invertedColors = invertedColors
        })
        builder.addCase(privateAuthActions.logout, () => {
            colors.primary = colors.primaryBlue
            return initialState
        })
    },
})

const { actions } = settingsSlice

export const privateSettingsActions = actions

const { setTheme, setInvertedColors, setColor } = actions
export const settingsActions = {
    setColor,
    setInvertedColors,
    setTheme,
}

export default settingsSlice.reducer
