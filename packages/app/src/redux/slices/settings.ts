import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Theme } from '@recipes/api-types/v1'
import { authActions } from './auth'
import { colors, themeUtils } from '@/utils'
import { Typography } from '@/styles'

export type Settings = {
    invertedColors: boolean
    textSize: Typography.TextSize
    theme: themeUtils.Theme
}

const initialState: Settings = {
    invertedColors: false,
    textSize: 'm',
    theme: themeUtils.darkTheme(),
}

function getTheme(theme: Theme): themeUtils.Theme {
    return theme === 'dark' ? themeUtils.darkTheme() : themeUtils.lightTheme()
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setInvertedColors(state, action: PayloadAction<boolean>) {
            state.invertedColors = action.payload
        },
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = getTheme(action.payload)
        },
        setColor(state, action: PayloadAction<string>) {
            const color = action.payload
            colors.primary = color
            state.theme = { ...state.theme, primary: color }
        },
        setTextSize(state, action: PayloadAction<Typography.TextSize>) {
            state.textSize = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authActions.login, (state, action) => {
            const { user } = action.payload
            const { color, invertedColors, theme } = user.settings
            colors.primary = color
            state.theme = { ...getTheme(theme), primary: color }
            state.invertedColors = invertedColors
        })
        builder.addCase(authActions.logout, () => {
            colors.primary = colors.primaryBlue
            return initialState
        })
    },
})

export const settingsActions = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
