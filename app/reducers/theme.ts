import colors from '../config/colors'
import {Theme, DarkTheme, LightTheme} from '../config/themes'

export const THEME_ACTIONS = {
    SET_THEME: 'setTheme',
    SET_COLOR: 'setColor',
}

const lightTheme = (): Theme => LightTheme

const darkTheme = (): Theme => DarkTheme


const theme = (state = darkTheme(), action: {type: string, payload: string}): Theme => {
    switch (action.type) {

        case THEME_ACTIONS.SET_THEME: {
            const newTheme = action.payload
            return newTheme === 'dark' ? darkTheme() : lightTheme()
        }

        case THEME_ACTIONS.SET_COLOR: {
            const color = action.payload
            colors.primary = color
            return { ...state, primary: color}
        }

        default:
            return state
    }
}

export default theme
