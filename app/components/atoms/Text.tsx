import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'

type Props = TextProps &
    LayoutProps &
    RNTextProps

const Text = ({children, ...rest }: Props): JSX.Element => (
    <RNText
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    >
        {children}
    </RNText>

)

export default withTextProps(Text)
