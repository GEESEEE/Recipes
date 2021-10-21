import React from 'react'
import { View as RNView } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

export type ViewProps = LayoutProps

function View({ children, ...rest }: ViewProps): JSX.Element {
    return <RNView {...rest}>{children}</RNView>
}

export default withLayoutProps(View)
