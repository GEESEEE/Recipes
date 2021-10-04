import { css, FlattenInterpolation } from 'styled-components'

// Font Weights
export type TextWeight = 'light' | 'normal' | 'semiBold' | 'bold' | 'extraBold'
export const fontWeight: Record<TextWeight, string> = {
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

// Text styles
export type TextSize = 'm' | 'l' | 'xl'
export type TextType = 'Header' | 'SubHeader' | 'Text' | 'SubText' | 'TinyText'

const standardTextSize: Record<TextSize, number> = {
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

const lineHeightMultiplier = 1.35

export const fontSize = (type: TextType, size: TextSize): number => standardTextSize[size] + textOffset[type]
export const lineHeight = (type: TextType, size: TextSize): number => fontSize(type, size) * lineHeightMultiplier

type textOptions = {
    color?: string
    weight?: TextWeight
}

export const textStyle = (type: TextType, size: TextSize, options?: textOptions): FlattenInterpolation<any> => css`
    ${textWeight[type]}
    font-size: ${fontSize(type, size)}px;
    line-height: ${lineHeight(type, size)}px;
    color: ${(props) => options?.color || props.theme.text};
    ${options?.weight ? fontWeight[options?.weight] : undefined}
`
