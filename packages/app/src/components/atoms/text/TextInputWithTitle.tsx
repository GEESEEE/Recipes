import React from 'react'
import styled from 'styled-components'
import { View, Text, TextInput, TextInputProps } from '@/components/base'
import { useSettings } from '@/hooks'

type TextInputRoundedProps = {
    title?: string
} & TextInputProps

function TextInputWithTitle({
    title,
    marginHorizontal,
    paddingHorizontal = 'm',
    width = 'l',
    ...rest
}: TextInputRoundedProps): JSX.Element {
    const { theme } = useSettings()

    return (
        <Container
            width={width}
            marginVertical="s"
            marginHorizontal={marginHorizontal}
        >
            {title ? (
                <Text type="SubText" paddingHorizontal={paddingHorizontal}>
                    {title}
                </Text>
            ) : null}
            <TextInput
                borderRadius="s"
                paddingVertical="s"
                paddingHorizontal={paddingHorizontal}
                placeholder={title}
                backgroundColor={theme.backgroundVariant}
                {...rest}
            />
        </Container>
    )
}

export default TextInputWithTitle

const Container = styled(View)``
