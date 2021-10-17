import { css } from 'styled-components'

export const grey = css`
    color: ${(props) => props.theme.grey};
`

export const red = css`
    color: ${(props) => props.theme.error};
`

export const primary = css`
    color: ${(props) => props.theme.primary};
`

export const background = css`
    color: ${(props) => props.theme.background};
`

export const text = css`
    color: ${(props) => props.theme.text};
`
