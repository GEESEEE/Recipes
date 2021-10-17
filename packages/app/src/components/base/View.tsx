import React from 'react'
import { View as RNView } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

export type ViewProps = {
    backgroundColor?: string
} & LayoutProps

function View({
    backgroundColor,
    style,
    children,
    ...rest
}: ViewProps): JSX.Element {
    return (
        <RNView
            style={[
                {
                    backgroundColor,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </RNView>
    )
}

export default withLayoutProps(View)
