import React from 'react'
import { StyleProp, Text as RNText, ViewStyle } from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps as RNTextProps,
} from '@/components/higher-order'
import { Typography } from '@/styles'
import { useAppSelector } from '@/hooks'

export type TextProps = {
    fixHeight?: boolean;
    type: Typography.TextType
} & RNTextProps & LayoutProps

const Text = ({ fixHeight, type, style, ...rest }: TextProps): JSX.Element => {
    const { textSize } = useAppSelector((state) => state.settings)
    const textStyle: StyleProp<ViewStyle> = {}
    if (fixHeight) {
        textStyle.height = Typography.lineHeight(type, textSize)
    }
    return (
    <RNText
        style={[
            textStyle,
            style
        ]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    />
 )}

export default withLayoutProps(withTextProps(Text as any))
