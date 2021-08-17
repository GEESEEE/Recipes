import React from 'react'
import {View, TextInput, Text } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

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
    const theme = useSelector((state: any) => state.theme)

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
                onEndEditing={(e) => {if (onEndEditing) onEndEditing(e.nativeEvent.text)}}
            />
            {rightIcon ?? null}
        </InputFieldRoundedStyle>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <BottomPadding/>}
    </Container>
)}

const Container = styled(View)`
    flexDirection: column;
    alignItems: center;
`

const InputFieldRoundedStyle = styled(View)`
    flexDirection: row;
    alignItems: center;
    width: 85%;
    marginTop: 4px;
    marginBottom: 2px;
    paddingLeft: 10px;
    paddingRight: 10px;
    paddingBottom: 5px;
    paddingTop: 5px;
    borderRadius: 20px;
    backgroundColor: ${(props) => props.theme.backgroundVariant}
`

const TextInputRounded = styled(TextInput)`
    flex: 1;
    paddingLeft: 10px;
    color: ${(props) => props.theme.text}
`

const BottomPadding = styled(View)`
    height: 14px;
`

const ErrorMessage = styled(Text)`
    color: ${(props) => props.theme.error};
    fontSize: 10px;
    padding: 0px;

`



