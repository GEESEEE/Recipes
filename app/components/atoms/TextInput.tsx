import React from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import styled from 'styled-components'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { Typography } from '@/styles'
import { useAppSelector } from '@/hooks'

type TextInputProps = {
    children: React.ReactNode
    type?: Typography.TextType
}
& PaddingAndMarginProps
& RNTextInputProps

function TextInput({
    children,
    type,
    ...rest
}: TextInputProps ): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    type = type || 'Text'

    const StyledTextInput = styled(RNTextInput)`
        ${Typography.textStyle(type, settings.textSize)}
    `

    return (
        <StyledTextInput

            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </StyledTextInput>
    )
}

export default withPaddingAndMargins(TextInput)
