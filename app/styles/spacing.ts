export type Size = 's' | 'm' | 'l'

const spacings: Record<Size, number> = {
    s: 4,
    m: 8,
    l: 12
}

export const paddingVertical = (size: Size): string => `padding-vertical: ${spacings[size]}px;`

export const paddingHorizontal = (size: Size): string => `padding-horizontal: ${spacings[size]}px;`

export const marginVertical = (size: Size): string => `margin-vertical: ${spacings[size]}px;`

export const marginHorizontal = (size: Size): string => `margin-horizontal: ${spacings[size]}px;`


const borderWidths: Record<Size, number> = {
    s: 1,
    m: 2,
    l: 3
}

export const borderWidth = (size: Size): string => `border-width: ${borderWidths[size]}px;`

export const borderRadius = (size: Size): string => `border-radius: ${borderWidths[size] * 10}px;`
