import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'

const ButtonStyleGeneric = styled(View)`
    flexDirection: row;
    alignItems: center;
    width: 85%;
    marginTop: 8px;
    marginBottom: 8px;
    paddingLeft: 10px;
    paddingRight: 10px;
    borderRadius: 20px;
    paddingTop: 8px;
    paddingBottom: 8px;
`

const ButtonTextGeneric = styled(Text)`
    textAlign: center;
    flex: 1;
`

const ButtonFilledStyle = styled(ButtonStyleGeneric)`
    backgroundColor: ${(props) => props.theme.primary}
`

const ButtonFilledText = styled(ButtonTextGeneric)`
    fontWeight: bold;
    textTransform: uppercase;
    fontSize: 16px;
    color: ${(props) => props.theme.background};
`

export function ButtonFilled({text, onPress}:{text: string, onPress: () => void}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <ButtonFilledStyle>
                <ButtonFilledText>
                    {text}
                </ButtonFilledText>
            </ButtonFilledStyle>
        </TouchableOpacity>
    )
}

const ButtonInvertedStyle = styled(ButtonStyleGeneric)`
    backgroundColor: ${(props) => props.theme.background}
    borderWidth: 2px;
    borderColor: ${(props) => props.theme.primary}
`

const ButtonInvertedText = styled(ButtonTextGeneric)`
    fontWeight: bold;
    textTransform: uppercase;
    fontSize: 16px;
    color: ${(props) => props.theme.primary};
`

export function ButtonInverted({text, onPress}:{text: string, onPress: () => void}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <ButtonInvertedStyle>
                <ButtonInvertedText>
                    {text}
                </ButtonInvertedText>
            </ButtonInvertedStyle>
        </TouchableOpacity>
    )
}

const ButtonBorderlessStyle = styled(ButtonStyleGeneric)`
    width: 50%;
    backgroundColor: ${(props) => props.theme.background}
`

const ButtonBorderlessText = styled(ButtonTextGeneric)`
    fontWeight: normal;
    textTransform: none;
    fontSize: 12px;
    color: ${(props) => props.theme.primary};
`
export function ButtonBorderless({text, onPress}:{text: string, onPress: () => void}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <ButtonBorderlessStyle>
                <ButtonBorderlessText>
                    {text}
                </ButtonBorderlessText>
            </ButtonBorderlessStyle>
        </TouchableOpacity>
    )
}
