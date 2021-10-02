import { css, FlattenInterpolation } from 'styled-components'

export const base = css`
    color: ${(props) => props.theme.text};
`

// Font Sizing
type FontSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

const fontSizes: Record<FontSize, number> = {
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    xxl: 20,
    xxxl: 22
}

export const fontSize = (size: FontSize): string => `font-size: ${fontSizes[size]}px;`

// Font Weights
export const fontWeight = {
    light: `
        font-family: sans-serif-light;
        font-weight: normal;
    `,
    normal: `
        font-family: sans-serif;
        font-weight: normal;
    `,
    semiBold: `
        font-family: sans-serif-medium;
        font-weight: normal;
    `,
    bold: `
        font-family: sans-serif;
        font-weight: bold;
    `,
    extraBold: `
        font-family: sans-serif-medium;
        font-weight: bold;

    `,
}

// Letter Spacing
export const letterSpacing = {
    m: ` letter-spacing: 1px; `,
    l: ` letter-spacing: 2px; `,
    xl: ` letter-spacing: 3px ;`,
}

// Text styles
export type TextSize = 'm' | 'l' | 'xl'

// Header
const headers: Record<TextSize, FontSize> = {
    m: 'xl',
    l: 'xxl',
    xl: 'xxxl'
}

export const header = (size: TextSize): FlattenInterpolation<any> => css`
    ${base}
    ${fontSize(headers[size])}
    ${fontWeight.bold}
`

// SubHeaders
const subHeaders: Record<TextSize, FontSize> = {
    m: 'l',
    l: 'xl',
    xl: 'xxl'
}

export const subHeader = (size: TextSize): FlattenInterpolation<any> => css`
    ${base}
    ${fontSize(subHeaders[size])}
    ${fontWeight.semiBold}
`

// Text
export const text = (size: TextSize): FlattenInterpolation<any> => css`
    ${base}
    ${fontSize(size)}
    ${fontWeight.normal}
`

// Sub Text
const subTexts: Record<TextSize, FontSize> = {
    m: 's',
    l: 'm',
    xl: 'l'
}

export const subText = (size: TextSize): FlattenInterpolation<any> => css`
    ${base}
    ${fontSize(subTexts[size])}
    ${fontWeight.normal}
`

// Tiny Text
const tinyTexts: Record<TextSize, FontSize> = {
    m: 'xs',
    l: 's',
    xl: 'm'
}

export const tinyText = (size: TextSize): FlattenInterpolation<any> => css`
    ${base}
    ${fontSize(tinyTexts[size])}
    ${fontWeight.normal}
`
