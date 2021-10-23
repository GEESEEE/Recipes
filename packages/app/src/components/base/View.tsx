import React from 'react'
import { View as RNView } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

export type ViewProps = LayoutProps

const View = React.forwardRef(
    ({ children, ...rest }: ViewProps, ref: any): JSX.Element => {
        return (
            <RNView ref={ref} {...rest}>
                {children}
            </RNView>
        )
    }
)

export default withLayoutProps(View)
