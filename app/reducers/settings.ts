import { colors } from '@/config'

export const SETTINGS_ACTIONS = {
    SET_SETTINGS: 'setSettings',
    SET_INVERTED_COLORS: 'setInvertedColors',
    SET_THEME: 'setTheme',
    SET_COLOR: 'setColor',
    RESET_SETTINGS: 'resetSettings',
}

export type Theme = {
    mode: string
    primary: string
    background: string
    backgroundVariant: string
    text: string
    textVariant: string
    grey: string
    greyVariant: string
    error: string
}

const lightTheme = (): Theme => ({
    mode: 'light',
    primary: colors.primary,
    background: colors.white,
    backgroundVariant: colors.lightestgrey,
    text: colors.black,
    textVariant: colors.darkestgrey,
    grey: colors.grey,
    greyVariant: colors.lightgrey,
    error: colors.red,
})

const darkTheme = (): Theme => ({
    mode: 'dark',
    primary: colors.primary,
    background: colors.darkestgrey,
    backgroundVariant: colors.darkergrey,
    text: colors.white,
    textVariant: colors.lightestgrey,
    grey: colors.grey,
    greyVariant: colors.darkgrey,
    error: colors.red,
})

export interface Settings {
    invertedColors: boolean
    theme: Theme
}

export const initialSettings: Settings = {
    invertedColors: false,
    theme: darkTheme(),
}

const settings = (
    state = initialSettings,
    action: { type: string; payload: any }
): Settings => {
    switch (action.type) {
        case SETTINGS_ACTIONS.SET_SETTINGS: {
            const { newTheme, color, invertedColors } = action.payload
            colors.primary = color
            let theme = newTheme === 'dark' ? darkTheme() : lightTheme()
            theme = { ...theme, primary: color }
            return { theme, invertedColors }
        }

        case SETTINGS_ACTIONS.RESET_SETTINGS: {
            colors.primary = colors.primaryBlue
            return initialSettings
        }

        case SETTINGS_ACTIONS.SET_INVERTED_COLORS: {
            const { invertedColors } = action.payload
            return { ...state, invertedColors }
        }

        case SETTINGS_ACTIONS.SET_THEME: {
            const { newTheme } = action.payload
            const theme = newTheme === 'dark' ? darkTheme() : lightTheme()
            return { ...state, theme }
        }

        case SETTINGS_ACTIONS.SET_COLOR: {
            const { color } = action.payload
            colors.primary = color
            const theme = { ...state.theme, primary: color }
            return { ...state, theme }
        }

        default: {
            return state
        }
    }
}

export default settings
