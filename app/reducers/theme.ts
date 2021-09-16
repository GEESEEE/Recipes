import colors from '../config/colors'

export const THEME_ACTIONS = {
    INITIALIZE_THEME: 'initializeTheme',
    RESET_THEME: 'resetTheme',
    SET_THEME: 'setTheme',
    SET_COLOR: 'setColor',
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

const theme = (
    state = darkTheme(),
    action: { type: string; payload: any }
): Theme => {
    switch (action.type) {
        case THEME_ACTIONS.INITIALIZE_THEME: {
            const {newTheme, color} = action.payload
            colors.primary = color
            const newState = newTheme === 'dark' ? darkTheme() : lightTheme()
            return {...newState, primary: color}
        }

        case THEME_ACTIONS.RESET_THEME: {
            colors.primary = colors.primaryBlue
            return darkTheme()
        }

        case THEME_ACTIONS.SET_THEME: {
            const {newTheme} = action.payload
            return newTheme === 'dark' ? darkTheme() : lightTheme()
        }

        case THEME_ACTIONS.SET_COLOR: {
            const { color} = action.payload
            colors.primary = color
            return { ...state, primary: color }
        }

        default:
            return state
    }
}

export default theme
