import React from 'react'
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
} from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'
import { Typography } from '@/styles'
import { utils } from '@/config'
import { useAppSelector } from '@/hooks'

export type TextInputProps = RNTextInputProps & TextProps & LayoutProps

const TextInput = ({ type, paddingVertical, style, ...rest }: TextInputProps): JSX.Element => {
    const { theme, textSize } = useAppSelector((state) => state.settings)
    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)
    const padding = 2 * (utils.searchStyles(style, 'paddingVertical') ?? 0)

    const [height, setHeight] = React.useState(lineHeight + padding)

    function onContentSizeChange(e: any): void {
        const lines = Math.round((e.nativeEvent.contentSize.height - padding) / lineHeight)
        setHeight( (lines * lineHeight) + padding)
    }

    return (
        <RNTextInput
            style={[
                {height}, style
            ]}
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            autoCorrect={false}
            onContentSizeChange={(e: any) => onContentSizeChange(e)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(TextInput))
