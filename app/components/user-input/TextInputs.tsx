import React from 'react'
import { View, TextInput } from 'react-native'

import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { ErrorMessage } from './ErrorMessage'

export const InputFieldRounded = ({
    onChangeText,
    placeholder,
    onEndEditing,
    secureTextEntry,
    errorMessage,
    leftIcon,
    rightIcon,
}: {
    onChangeText: (text: string) => void
    placeholder: string
    onEndEditing?: (e: any) => void
    secureTextEntry?: boolean
    errorMessage?: string
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <Container>
            <InputFieldRoundedStyle>
                {leftIcon ?? null}
                <TextInputRounded
                    placeholder={placeholder}
                    placeholderTextColor={theme.grey}
                    autoCapitalize="none"
                    secureTextEntry={secureTextEntry ?? false}
                    onChangeText={(text) => onChangeText(text)}
                    onEndEditing={(e) => {
                        if (onEndEditing) onEndEditing(e.nativeEvent.text)
                    }}
                />
                {rightIcon ?? null}
            </InputFieldRoundedStyle>
            <ErrorMessage errorMessage={errorMessage} />
        </Container>
    )
}

const Container = styled(View)`
    flex-direction: column;
    align-items: center;
`

const InputFieldRoundedStyle = styled(View)`
    flex-direction: row;
    align-items: center;
    width: 85%;
    margin-top: 4px;
    margin-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.backgroundVariant};
`

const TextInputRounded = styled(TextInput)`
    flex: 1;
    padding-left: 10px;
    color: ${(props) => props.theme.text};
`
