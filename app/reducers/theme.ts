import colors from '../config/colors'

export const THEME_ACTIONS = {
    SET_THEME: 'setTheme',
    SET_COLOR: 'setColor',
}

export type Theme = {
    mode: string
    primary: string
    background: string
    backgroundVariant: string
    text: string
    grey: string
    error: string
}

const lightTheme = (): Theme => ({
    mode: 'light',
    primary: colors.primary,
    background: colors.white,
    backgroundVariant: colors.lightestgrey,
    text: colors.darkergrey,
    grey: colors.grey,
    error: colors.red,
})

const darkTheme = (): Theme => ({
    mode: 'dark',
    primary: colors.primary,
    background: colors.darkestgrey,
    backgroundVariant: colors.darkergrey,
    text: colors.lightergrey,
    grey: colors.grey,
    error: colors.red,
})

const theme = (
    state = darkTheme(),
    action: { type: string; payload: string }
): Theme => {
    switch (action.type) {
        case THEME_ACTIONS.SET_THEME: {
            const newTheme = action.payload
            return newTheme === 'dark' ? darkTheme() : lightTheme()
        }

        case THEME_ACTIONS.SET_COLOR: {
            const color = action.payload
            colors.primary = color
            return { ...state, primary: color }
        }

        default:
            return state
    }
}

export default theme
