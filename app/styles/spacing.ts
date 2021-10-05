import * as Typography from './typography'

export type Size = 's' | 'm' | 'l'

// Spacing
export const spacings: Record<Size, number> = {
    s: 4,
    m: 8,
    l: 12,
}

// Padding
export const padding = (size: Size): string =>
    `${paddingVertical(size)} ${paddingHorizontal(size)}`

export const paddingVertical = (size: Size): string =>
    `padding-vertical: ${spacings[size]}px;`

export const paddingHorizontal = (size: Size): string =>
    `padding-horizontal: ${spacings[size]}px;`

// Margins
export const margin = (size: Size): string =>
`${marginVertical(size)} ${marginHorizontal(size)}`

export const marginVertical = (size: Size): string =>
    `margin-vertical: ${spacings[size]}px;`

export const marginHorizontal = (size: Size): string =>
    `margin-horizontal: ${spacings[size]}px;`


// Sizing
export const widths: Record<Size, number> = {
    s: 30,
    m: 60,
    l: 90,
}

export const width = (size: Size): string => `width: ${widths[size]}%;`

const borderWidths: Record<Size, number> = {
    s: 1,
    m: 2,
    l: 3,
}

export const borderWidth = (size: Size): string =>
    `border-width: ${borderWidths[size]}px;`

export const borderRadii: Record<Size, number> = {
    s: 10,
    m: 15,
    l: 20,
}

export const borderRadius = (size: Size): string =>
    `border-radius: ${borderRadii[size]}px;`

export const standardIconSize: Record<Size, number> = {
    s: 20,
    m: 23,
    l: 26,
}

export const iconOffset: Record<Typography.TextSize, number> = {
    m: 0,
    l: 4,
    xl: 8
}

export const iconSize = (
    size: Size, textSize: Typography.TextSize
): number => standardIconSize[size] + iconOffset[textSize]
