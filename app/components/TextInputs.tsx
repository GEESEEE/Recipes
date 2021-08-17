import React from 'react'
import {View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const InputFieldRounded = ({
    secureTextEntry,
    onChangeText,
    onEndEditing,
    placeholder,
    leftIcon,
    rightIcon,
}: {
    secureTextEntry?: boolean
    onChangeText: (text: string) => void
    onEndEditing: (e: any) => void
    placeholder: string
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
}): JSX.Element => {
    const theme = useSelector((state: any) => state.theme)

    return (
    <UserInputStyle>
        {leftIcon ?? null}
        <UserInput
            placeholder={placeholder}
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry ?? false}
            onChangeText={(text) => onChangeText(text)}
            onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
        />
        {rightIcon ?? null}
    </UserInputStyle>
)}

const UserInputStyle = styled(View)`
    flexDirection: row;
    alignItems: center;
    width: 85%;
    marginTop: 8px;
    marginBottom: 8px;
    paddingLeft: 10px;
    paddingRight: 10px;
    paddingBottom: 5px;
    paddingTop: 5px;
    borderRadius: 20px;
    backgroundColor: ${(props) => props.theme.backgroundVariant}
`

const UserInput = styled(TextInput)`
    flex: 1;
    paddingLeft: 10px;
    color: ${(props) => props.theme.text}
`
