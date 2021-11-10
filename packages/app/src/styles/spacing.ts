import * as Typography from './typography'

export type Size = 'n' | 's' | 'm' | 'l'

// Spacing
export const spacings: Record<Size, number> = {
    n: 0,
    s: 4,
    m: 8,
    l: 12,
}

// Sizing
export const widths: Record<Size, string> = {
    n: '100%',
    s: '30%',
    m: '60%',
    l: '90%',
}

export const borderWidths: Record<Size, number> = {
    n: 0,
    s: 1,
    m: 2,
    l: 3,
}

export const borderRadii: Record<Size, number> = {
    n: 0,
    s: 10,
    m: 15,
    l: 20,
}

export const standardIconSize: Record<Typography.TextSize, number> = {
    m: 22,
    l: 26,
    xl: 30,
}

export const iconOffset: Record<Size, number> = {
    n: 0,
    s: 0,
    m: 4,
    l: 8,
}

export const iconSize = (size: Size, textSize: Typography.TextSize): number =>
    standardIconSize[textSize] + iconOffset[size]
