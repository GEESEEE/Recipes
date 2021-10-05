import React from 'react'
import styled from 'styled-components'
import { TextInput, View, ErrorMessage } from '@/components/atoms'
import { useAppSelector } from '@/hooks'

type TextInputWithIconsProps = {
    onChangeText: (text: string) => void
    placeholder: string
    onEndEditing?: (text: string) => void
    secureTextEntry?: boolean
    errorMessage?: string
    leftIcon?: JSX.Element
    rightIcon?: React.ReactNode
}

export const TextInputWithIcons = ({
    onChangeText,
    placeholder,
    onEndEditing,
    secureTextEntry,
    errorMessage,
    leftIcon,
    rightIcon
}: TextInputWithIconsProps): JSX.Element => {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container>
            <InputFieldContainer
                backgroundColor={theme.backgroundVariant}
                paddingHorizontal='m'
                paddingVertical='s'
                roundness='s'
                width='l'
            >
                {leftIcon || null}
                <StyledTextInput
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry || false}
                    onChangeText={(t) => onChangeText(t)}
                    onEndEditing={(e) => {if (onEndEditing) onEndEditing(e.nativeEvent.text) }}
                />
                {rightIcon || null}
            </InputFieldContainer>
            <ErrorMessage errorMessage={errorMessage}/>
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
