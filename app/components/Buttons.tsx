import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'

const ButtonStyleGeneric = styled(View)`
    flex-direction: row;
    align-items: center;
    width: 85%;
    margin-top: 8px;
    margin-bottom: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
`

const ButtonTextGeneric = styled(Text)`
    text-align: center;
    flex: 1;
`

const ButtonFilledStyle = styled(ButtonStyleGeneric)`
    background-color: ${(props) => props.theme.primary}
`

const ButtonFilledText = styled(ButtonTextGeneric)`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
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
    background-color: ${(props) => props.theme.background}
    border-width: 2px;
    border-color: ${(props) => props.theme.primary}
`

const ButtonInvertedText = styled(ButtonTextGeneric)`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
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
    background-color: ${(props) => props.theme.background}
`

const ButtonBorderlessText = styled(ButtonTextGeneric)`
    font-weight: normal;
    text-transform: none;
    font-size: 12px;
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
