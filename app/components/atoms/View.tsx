import React from 'react'
import { View as RNView, ViewProps as RNViewProps} from 'react-native'
import { withPaddingAndMargins, PaddingAndMarginProps } from '../higher-order'

type ViewProps = {
    children: React.ReactNode
}
& PaddingAndMarginProps
& RNViewProps

const View = ({
    children,
    style,
}: ViewProps): JSX.Element => (
    <RNView
        style={[style]}
    >
        {children}
    </RNView>
    )

export default withPaddingAndMargins(View)

