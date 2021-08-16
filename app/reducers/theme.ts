import colors from '../config/colors'

export const THEME_ACTIONS = {
    SET_THEME: 'setTheme',
}

export type Theme = {
    mode: string
    primary: string,
    secondary: string,
    background: string,
    text: string,
    grey: string
}

const lightTheme: Theme = {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.white,
    text: colors.black,
    grey: colors.grey,
}

const darkTheme: Theme = {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.darkergrey,
    text: colors.lightergrey,
    grey: colors.grey,
}

const theme = (state = darkTheme, action: {type: string, payload: string}): Theme => {
    switch (action.type) {

        case THEME_ACTIONS.SET_THEME: {
            const newTheme = action.payload
            return newTheme === 'dark' ? darkTheme : lightTheme
        }

        default:
            return state
    }
}

export default theme
