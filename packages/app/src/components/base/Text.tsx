import React from 'react'
import { StyleProp, Text as RNText, TextStyle, ViewStyle } from 'react-native'
import styled from 'styled-components'
import View from './View'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps as RNTextProps,
} from '@/components/higher-order'
import { Typography } from '@/styles'
import { useAppSelector } from '@/hooks'
import { utils } from '@/utils'

export type TextProps = {
    fixHeight?: boolean
} & RNTextProps &
    LayoutProps

const Text = ({
    fixHeight,
    type,
    numberOfLines,
    style,
    ...rest
}: TextProps): JSX.Element => {
    const { textSize } = useAppSelector((state) => state.settings)

    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)
    const padding = 2 * (utils.searchStyles(style, 'paddingVertical') ?? 0)

    const [height, setHeight] = React.useState<undefined | number>(undefined)

    function onTextLayout(e: any): void {
        let lines = e.nativeEvent.lines.length
        if (numberOfLines) {
            if (fixHeight) {
                lines = numberOfLines
            } else {
                lines = Math.min(numberOfLines, lines)
            }
        }
        setHeight(lineHeight * lines + padding)
    }

    const textStyle: StyleProp<TextStyle> = {
        height,
    }
    if (fixHeight && numberOfLines) {
        textStyle.textAlignVertical = 'center'
    }

    return (
        <RNText
            style={[textStyle, style]}
            onTextLayout={(e) => onTextLayout(e)}
            numberOfLines={numberOfLines}
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(Text))
