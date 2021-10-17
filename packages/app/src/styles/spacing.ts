import * as Typography from './typography'

export type Size = 's' | 'm' | 'l'

// Spacing
export const spacings: Record<Size, number> = {
    s: 4,
    m: 8,
    l: 12,
}

// Sizing
export const widths: Record<Size, string> = {
    s: '30%',
    m: '60%',
    l: '90%',
}

const borderWidths: Record<Size, number> = {
    s: 1,
    m: 2,
    l: 3,
}

export const borderRadii: Record<Size, number> = {
    s: 10,
    m: 15,
    l: 20,
}

export const standardIconSize: Record<Typography.TextSize, number> = {
    m: 20,
    l: 24,
    xl: 28,
}

export const iconOffset: Record<Size, number> = {
    s: 0,
    m: 3,
    l: 6,
}

export const iconSize = (size: Size, textSize: Typography.TextSize): number =>
    standardIconSize[textSize] + iconOffset[size]
