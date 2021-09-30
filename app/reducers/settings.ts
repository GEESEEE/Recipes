import { colors, themeUtils } from '@/config'

export const SETTINGS_ACTIONS = {
    SET_SETTINGS: 'setSettings',
    SET_INVERTED_COLORS: 'setInvertedColors',
    SET_THEME: 'setTheme',
    SET_COLOR: 'setColor',
    RESET_SETTINGS: 'resetSettings',
}

export interface Settings {
    invertedColors: boolean
    theme: themeUtils.Theme
}

export const initialSettings: Settings = {
    invertedColors: false,
    theme: themeUtils.darkTheme(),
}

function getTheme(theme: string): themeUtils.Theme {
    return theme === 'dark' ? themeUtils.darkTheme() : themeUtils.lightTheme()
}

const settings = (
    state = initialSettings,
    action: { type: string; payload: any }
): Settings => {
    switch (action.type) {
        case SETTINGS_ACTIONS.SET_SETTINGS: {
            const { newTheme, color, invertedColors } = action.payload
            colors.primary = color
            let theme = getTheme(newTheme)
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
            const theme = getTheme(newTheme)
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
