import React from 'react'
import { View as RNView } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

type ViewProps = {
    backgroundColor?: string
} & LayoutProps

function View({
    backgroundColor,
    style,
    ...rest
}: ViewProps): JSX.Element {
    return (
        <RNView
            style={[
                {
                    backgroundColor
                },
                style
            ]}
             // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(View)
