import React from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { withLayoutProps, LayoutProps, withTextProps, TextProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'

type TextInputProps = {
    children: React.ReactNode
}
& LayoutProps
& TextProps
& RNTextInputProps

function TextInput({
    children,

    ...rest
}: TextInputProps ): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    return (
        <RNTextInput
            placeholderTextColor={theme.grey}
            autoCapitalize='none'
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </RNTextInput>
    )
}

export default withLayoutProps(withTextProps(TextInput))
