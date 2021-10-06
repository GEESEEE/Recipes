import { css, FlattenInterpolation } from 'styled-components'

// Font Weights
export type TextWeight = 'light' | 'normal' | 'semiBold' | 'bold' | 'extraBold'
export const fontWeight: Record<TextWeight, any> = {
    light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
    },
    normal: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
    },
    semiBold: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
    },
    bold: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    extraBold: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
}

// Text styles
export type TextSize = 'm' | 'l' | 'xl'
export type TextType = 'Header' | 'SubHeader' | 'Text' | 'SubText' | 'TinyText'

export const standardTextSize: Record<TextSize, number> = {
    m: 14,
    l: 16,
    xl: 18,
}

export const textOffset: Record<TextType, number> = {
    Header: 6,
    SubHeader: 3,
    Text: 0,
    SubText: -2,
    TinyText: -4,
}

export const textWeight: Record<TextType, TextWeight> = {
    Header: 'bold',
    SubHeader: 'semiBold',
    Text: 'normal',
    SubText: 'normal',
    TinyText: 'normal',
}

export const lineHeightMultiplier = 1.35

export const fontSize = (type: TextType, size: TextSize): number =>
    standardTextSize[size] + textOffset[type]
export const lineHeight = (type: TextType, size: TextSize): number =>
    fontSize(type, size) * lineHeightMultiplier

type textOptions = {
    color?: string
    weight?: TextWeight
}

export const textStyle = (
    type: TextType,
    size: TextSize,
    options?: textOptions
): FlattenInterpolation<any> => css`
    font-size: ${fontSize(type, size)}px;
    line-height: ${lineHeight(type, size)}px;
    color: ${(props) => options?.color || props.theme.text};
    ${options?.weight ? fontWeight[options?.weight] : textWeight[type]}
`
