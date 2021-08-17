import colors from './colors'

export type Theme = {
    mode: string
    primary: string,
    secondary: string,
    background: string,
    backgroundVariant: string,
    text: string,
    grey: string
}

export const DarkTheme = {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.darkestgrey,
    backgroundVariant: colors.darkergrey,
    text: colors.lightergrey,
    grey: colors.grey,
}

export const LightTheme = {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.white,
    backgroundVariant: colors.lightergrey,
    text: colors.darkergrey,
    grey: colors.grey,
}
