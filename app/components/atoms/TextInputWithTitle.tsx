import React from 'react'
import styled from 'styled-components'
import { View, Text, TextInput, TextInputProps } from '@/components/base'

type TextInputRoundedProps = {
    title: string
} & TextInputProps

function TextInputWithTitle({
    title,
    paddingHorizontal,
    width,
    ...rest
}: TextInputRoundedProps): JSX.Element {
    paddingHorizontal = paddingHorizontal || 'm'
    width = width || 'l'

    return (
        <Container
            width={width}
            marginVertical='s'
        >
            <Text type='SubText' paddingHorizontal={paddingHorizontal} >
                {title}
            </Text>
            <StyledTextInput
                borderRadius='s'
                paddingVertical='s'
                paddingHorizontal={paddingHorizontal}
                placeholder={title}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />
        </Container>
    )
}

export default TextInputWithTitle

const Container = styled(View)`

`

const StyledTextInput = styled(TextInput)`
    background-color: ${(props) => props.theme.backgroundVariant}
`
