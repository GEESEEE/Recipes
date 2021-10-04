import React from 'react'
import styled from 'styled-components'
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
import { useAppSelector } from '@/hooks'

type TextInputProps = {
    children: React.ReactNode
    backgroundColor?: string
} & LayoutProps &
    TextProps &
    RNTextInputProps

function TextInput({
    children,
    backgroundColor,
    ...rest
}: TextInputProps): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    backgroundColor = backgroundColor || theme.background

    const StyledTextInput = styled(RNTextInput)`
        background-color: ${backgroundColor};
    `

    return (
        <StyledTextInput
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </StyledTextInput>
    )
}

export default withLayoutProps(withTextProps(TextInput))
