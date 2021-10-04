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
    ...rest
}: ViewProps): JSX.Element => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RNView {...rest}>
        {children}
    </RNView>
    )

export default withPaddingAndMargins(View)

