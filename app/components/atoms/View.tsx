import React from 'react'
import { View as RNView, ViewProps as RNViewProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '../higher-order'

type ViewProps = {
    children?: React.ReactNode | Element[]
} & LayoutProps &
    RNViewProps

const View = ({ children, ...rest }: ViewProps): JSX.Element => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RNView {...rest}>{children}</RNView>
)

export default withLayoutProps(View)
