import React from 'react'
import {
    Text as RNText,
    TextLayoutEventData,
    TextLayoutLine,
} from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps as RNTextProps,
} from '@/components/higher-order'
import { Typography } from '@/styles'
import { useAppSelector } from '@/hooks'
import { utils } from '@/config'

export type TextProps = {
    fixHeight?: boolean
} & RNTextProps &
    LayoutProps

const Text = ({ fixHeight, numberOfLines, type, style, ...rest }: TextProps): JSX.Element => {
    const { textSize } = useAppSelector((state) => state.settings)

    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)
    const padding = 2 * (utils.searchStyles(style, 'paddingVertical') ?? 0)

    const [height, setHeight] = React.useState<undefined | number>(
        fixHeight ? lineHeight + padding : undefined
    )

    function onTextLayout(e: any): void {
        console.log(e.nativeEvent.lines.length, numberOfLines)
        const lines = numberOfLines ?? e.nativeEvent.lines.length
        setHeight(lineHeight * lines + padding)
    }

    return (
        <RNText
            style={[{ height }, style]}
            onTextLayout={(e) => onTextLayout(e)}
            numberOfLines={numberOfLines}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(Text as any))
