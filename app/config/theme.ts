import colors from './colors'

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

const baseTheme = {
    primary: colors.primary,
    grey: colors.grey,
    error: colors.red,
}

export const lightTheme = (): Theme => ({
    ...baseTheme,
    mode: 'light',
    background: colors.white,
    backgroundVariant: colors.lightestgrey,
    text: colors.black,
    textVariant: colors.darkestgrey,
    greyVariant: colors.lightgrey,
})

export const darkTheme = (): Theme => ({
    ...baseTheme,
    mode: 'dark',
    background: colors.darkestgrey,
    backgroundVariant: colors.darkergrey,
    text: colors.white,
    textVariant: colors.lightestgrey,
    greyVariant: colors.darkgrey,
})
