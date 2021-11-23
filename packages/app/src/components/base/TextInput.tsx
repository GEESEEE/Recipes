import React from 'react'
import {
    Keyboard,
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
import { searchStyles } from '@/utils'
import { useSettings } from '@/hooks'

export type TextInputProps = { focus?: boolean } & RNTextInputProps &
    TextProps &
    LayoutProps

const TextInput = ({
    focus,
    type,
    style,
    multiline,
    ...rest
}: TextInputProps): JSX.Element => {
    const { theme, textSize } = useSettings()
    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)
    const padding = 2 * (searchStyles(style, 'paddingVertical') ?? 0)

    const [height, setHeight] = React.useState(lineHeight + padding)

    function onContentSizeChange(e: any): void {
        const lines = Math.round(
            (e.nativeEvent.contentSize.height - padding) / lineHeight
        )
        setHeight(lines * lineHeight + padding)
    }

    const ref = React.useRef<RNTextInput>(null)

    React.useEffect(() => {
        ref.current?.focus()
    }, [focus])

    return (
        <RNTextInput
            style={[{ height }, style]}
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            autoCorrect={false}
            onContentSizeChange={(e) => onContentSizeChange(e)}
            maxLength={255}
            blurOnSubmit={typeof multiline !== 'undefined'}
            multiline={multiline}
            returnKeyType="next"
            onSubmitEditing={() => {
                Keyboard.dismiss()
            }}
            ref={ref}
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(TextInput))
