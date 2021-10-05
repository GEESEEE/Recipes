import React from 'react'
import styled from 'styled-components'
import { View as RNView, ViewProps as RNViewProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '../higher-order'

type ViewProps = {
    children?: React.ReactNode | Element[]
    backgroundColor?: string
} & LayoutProps &
    RNViewProps

const View = ({ children, backgroundColor, ...rest }: ViewProps): JSX.Element => {
    let styles = ''

    if (backgroundColor) styles += `background-color: ${backgroundColor};`

    const StyledView = styled(RNView)`
        ${styles}
    `

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledView style={{ backgroundColor}}  {...rest}>{children}</StyledView>
    )
}

export default withLayoutProps(View)
