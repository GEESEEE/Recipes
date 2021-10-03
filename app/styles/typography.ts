import { css, FlattenInterpolation } from 'styled-components'

export const base = css`
    color: ${(props) => props.theme.text};
`

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
export type TextType = 'Header' | 'SubHeader' | 'Text' | 'SubText' | 'TinyText'

const textSize: Record<TextSize, number> = {
    m: 14,
    l: 16,
    xl: 18
}

const textOffset: Record<TextType, number> = {
    Header: 6,
    SubHeader: 3,
    Text: 0,
    SubText: -2,
    TinyText: -4
}

const textWeight: Record<TextType, string> = {
    Header: fontWeight.bold,
    SubHeader: fontWeight.semiBold,
    Text: fontWeight.normal,
    SubText: fontWeight.normal,
    TinyText: fontWeight.normal
}

export const textStyle = (type: TextType, size: TextSize): FlattenInterpolation<any> => css`
    ${base};
    font-size: ${textSize[size] + textOffset[type]}px;
    ${textWeight[type]}
`
