import { css, FlattenSimpleInterpolation } from 'styled-components'

export const base = css`
    color: ${(props) => props.theme.text}
`

type sizes = "xs" | "s" | "m" | "l" | "xl" | "xxl"

// Font Sizing
export const fontSize: Record<sizes, FlattenSimpleInterpolation> = {
    xs: css` font-size: 10px; `,
    s: css` font-size: 12px; `,
    m: css` font-size: 14px; `,
    l: css` font-size: 16px; `,
    xl: css` font-size: 18px; `,
    xxl: css` font-size: 20px; `,
}

// Font Weights
type fontWeight = "light" | "normal" | "semiBold" | "bold" | "extraBold"
export const fontWeight: Record<fontWeight, FlattenSimpleInterpolation> = {
    light: css`
        font-family: sans-serif-light;
        font-weight: normal;
    `,
    normal: css`
        font-family: sans-serif;
        font-weight: normal;
    `,
    semiBold: css`
        font-family: sans-serif-medium;
        font-weight: normal;
    `,
    bold: css`
        font-family: sans-serif;
        font-weight: bold;
    `,
    extraBold: css`
        font-family: sans-serif-medium;
        font-weight: bold;

    `
}

// Letter Spacing
type letterSpacing = "m" | "l" | "xl"
export const letterSpacing: Record<letterSpacing, FlattenSimpleInterpolation> = {
    m: css` letter-spacing: 1px `,
    l: css` letter-spacing: 2px `,
    xl: css` letter-spacing: 3px `,
}

// // Text styles
type headerSizes = "l" | "xl" | "xxl"
export const header: Record<headerSizes, FlattenSimpleInterpolation> = {
    l: css`
        ${fontSize.l};
        ${fontWeight.bold};
    `,
    xl: css`
        ${fontSize.xl};
        ${fontWeight.bold};
    `,
    xxl: css`
        ${fontSize.xxl};
        ${fontWeight.bold};
    `
}

type subHeaderSizes = "m" | "l" | "xl"
export const subHeader: Record<subHeaderSizes, FlattenSimpleInterpolation> = {
    m: css`
        ${fontSize.m};
        ${fontWeight.semiBold}
    `,
    l: css`
        ${fontSize.l};
        ${fontWeight.semiBold}
    `,
    xl: css`
        ${fontSize.xl};
        ${fontWeight.semiBold}
    `
}

type textSizes = "xs" | "s" | "m" | "l"
export const text: Record<textSizes, FlattenSimpleInterpolation> = {
    xs: css`
        ${fontSize.xs};
        ${fontWeight.normal};
    `,
    s: css`
        ${fontSize.s};
        ${fontWeight.normal};
    `,
    m: css`
        ${fontSize.m};
        ${fontWeight.normal};
    `,
    l: css`
        ${fontSize.l};
        ${fontWeight.normal};
    `
}
