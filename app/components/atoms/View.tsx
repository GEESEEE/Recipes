import React from 'react'
import styled from 'styled-components'
import { View as RNView, ViewProps as RNViewProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '../higher-order'

type ViewProps = {
    children?: React.ReactNode | Element[]
    backgroundColor?: string
} & LayoutProps &
    RNViewProps

const View = ({ children, ...rest }: ViewProps): JSX.Element => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledView {...rest}>{children}</StyledView>
    )

export default withLayoutProps(View)

const StyledView = styled(RNView).attrs(({
    backgroundColor
}: ViewProps) => ({
    backgroundColor
}))`

`
