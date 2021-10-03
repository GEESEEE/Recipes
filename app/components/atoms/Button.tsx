import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import styled from 'styled-components'
import { Text } from '@/components/atoms'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { Typography, Buttons } from '@/styles'

type ButtonProps = {
    type: Buttons.ButtonType
    text: string
    textType?: Typography.TextType
    loading?: boolean
}
& PaddingAndMarginProps
& PressableProps

const Button = ({
    type,
    text,
    textType,
    loading,
    ...rest
}: ButtonProps): JSX.Element => {
    console.log("Button", type, text, textType, loading)

    const StyledPressable = styled(Container)`
        ${Buttons.button(type)}
    `

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledPressable {...rest}>
            <Text
                type={textType ?? 'Text'}
            >
                {text}
            </Text>
        </StyledPressable>
    )}

export default withPaddingAndMargins(Button)

const Container = styled(Pressable)`
    align-items: center;
    justify-content: center;
`
