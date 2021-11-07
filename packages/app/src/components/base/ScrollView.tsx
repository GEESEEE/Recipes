import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

export type ViewProps = LayoutProps

const View = React.forwardRef(
    ({ children, ...rest }: ViewProps, ref: any): JSX.Element => {
        return (
            <RNScrollView ref={ref} {...rest}>
                {children}
            </RNScrollView>
        )
    }
)

export default withLayoutProps(View)
