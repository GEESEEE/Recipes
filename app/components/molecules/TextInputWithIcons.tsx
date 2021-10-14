import React from 'react'
import styled from 'styled-components'
import { TextInput, View, TextInputProps } from '@/components/base'
import { Error } from '@/components/atoms'
import { useAppSelector } from '@/hooks'

type TextInputWithIconsProps = {
    onChangeText: (text: string) => void
    placeholder: string
    onEndEditing?: (text: string) => void
    secureTextEntry?: boolean
    errorMessage?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
} & TextInputProps

export const TextInputWithIcons = ({
    errorMessage,
    leftIcon,
    rightIcon,
    ...rest
}: TextInputWithIconsProps): JSX.Element => {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container>
            <InputFieldContainer
                backgroundColor={theme.backgroundVariant}
                paddingHorizontal="m"
                paddingVertical="m"
                marginVertical="s"
                borderRadius="s"
                width="l"
            >
                {leftIcon || null}
                <StyledTextInput
                    paddingHorizontal="s"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...rest}
                />
                {rightIcon || null}
            </InputFieldContainer>
            <Error message={errorMessage} />
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
