import React from 'react'
import {View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const InputFieldRoundedStyle = styled(View)`
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

const TextInputRounded = styled(TextInput)`
    flex: 1;
    paddingLeft: 10px;
    color: ${(props) => props.theme.text}
`

export const InputFieldRounded = ({
    onChangeText,
    placeholder,
    onEndEditing,
    secureTextEntry,
    multiline,
    leftIcon,
    rightIcon
}: {

    onChangeText: (text: string) => void
    placeholder: string
    onEndEditing?: (e: any) => void
    secureTextEntry?: boolean
    multiline?: boolean
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
}): JSX.Element => {
    const theme = useSelector((state: any) => state.theme)

    return (
    <InputFieldRoundedStyle>
        {leftIcon ?? null}
        <TextInputRounded
            placeholder={placeholder}
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry ?? false}
            onChangeText={(text) => onChangeText(text)}
            onEndEditing={(e) => {if (onEndEditing) onEndEditing(e.nativeEvent.text)}}
            multiline={multiline}
        />
        {rightIcon ?? null}
    </InputFieldRoundedStyle>
)}

export const InputField = ({

})


