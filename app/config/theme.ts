import  colors from './colors';

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

export const lightTheme = (): Theme => ({
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

export const darkTheme = (): Theme => ({
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
