import React from 'react'
import styled from 'styled-components'
import Error from './Error'
import { TextInput, View, TextInputProps } from '@/components/base'
import { useSettings } from '@/hooks'

type TextInputWithIconsProps = {
    onChangeText: (text: string) => void
    placeholder: string
    onEndEditing?: (text: string) => void
    secureTextEntry?: boolean
    error?: boolean
    errorMessage?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
} & TextInputProps

export const TextInputWithIcons = ({
    error,
    errorMessage,
    leftIcon,
    rightIcon,
    marginHorizontal,
    marginVertical,
    paddingVertical,
    paddingHorizontal,
    width,
    ...rest
}: TextInputWithIconsProps): JSX.Element => {
    const { theme } = useSettings()

    paddingHorizontal = paddingHorizontal || 'm'
    paddingVertical = paddingVertical || 'm'
    width = width || 'l'
    return (
        <Container
            marginHorizontal={marginHorizontal}
            marginVertical={marginVertical}
        >
            <InputFieldContainer
                backgroundColor={theme.backgroundVariant}
                paddingHorizontal={paddingHorizontal}
                paddingVertical={paddingVertical}
                marginVertical="s"
                borderRadius="s"
                width={width}
            >
                {leftIcon}
                <StyledTextInput paddingHorizontal="s" {...rest} />
                {rightIcon}
            </InputFieldContainer>
            {error ? <Error message={errorMessage} /> : null}
        </Container>
    )
}

export default TextInputWithIcons

const Container = styled(View)`
    flex-direction: column;
    align-items: center;
`

const InputFieldContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const StyledTextInput = styled(TextInput)`
    flex: 1;
`
