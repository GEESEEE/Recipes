import React from 'react'
import {
    TouchableOpacity as RNTouchableOpacity,
    TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native'
import { withLayoutProps, LayoutProps } from '../higher-order'

export type TouchableOpacityProps = RNTouchableOpacityProps & LayoutProps

function TouchableOpacity({ ...rest }: TouchableOpacityProps): JSX.Element {
    return (
        <RNTouchableOpacity
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(TouchableOpacity)
