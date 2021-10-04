import React from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import styled from 'styled-components'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { Typography } from '@/styles'
import { useAppSelector } from '@/hooks'

type TextInputProps = {
    type: Typography.TextType
}
& PaddingAndMarginProps
& RNTextInputProps

function TextInput({
    type
}: TextInputProps ): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    const StyledTextInput = styled(RNTextInput)`
        ${Typography.textStyle(type, settings.textSize)}
    `

    return (
        <StyledTextInput />
    )
}

export default withPaddingAndMargins(TextInput)
