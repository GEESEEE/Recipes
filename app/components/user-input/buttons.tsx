import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux'
import { MyMaterialIcons } from '../icons'

export type ButtonProps = {
    text: string,
    onPress: () => void
}

const ButtonStyleGeneric = styled(TouchableOpacity)`
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

export function ButtonFilled({
    text,
    onPress,
}: ButtonProps): JSX.Element {
    return (
        <ButtonFilledStyle onPress={onPress}>
            <ButtonFilledText>{text}</ButtonFilledText>
        </ButtonFilledStyle>
    )
}

const ButtonFilledStyle = styled(ButtonStyleGeneric)`
    background-color: ${(props) => props.theme.primary};
`

const ButtonFilledText = styled(ButtonTextGeneric)`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    color: ${(props) => props.theme.background};
`

export function ButtonInverted({
    text,
    onPress,
}: ButtonProps): JSX.Element {
    return (
        <ButtonInvertedStyle onPress={onPress}>
            <ButtonInvertedText>{text}</ButtonInvertedText>
        </ButtonInvertedStyle>
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

export function ButtonBorderless({
    text,
    onPress,
}: ButtonProps): JSX.Element {
    return (
        <ButtonBorderlessStyle onPress={onPress}>
            <ButtonBorderlessText>{text}</ButtonBorderlessText>
        </ButtonBorderlessStyle>
    )
}

const ButtonBorderlessStyle = styled(ButtonStyleGeneric)`
    width: 50%;
    background-color: ${(props) => props.theme.background};
`

const ButtonBorderlessText = styled(ButtonTextGeneric)`
    font-weight: normal;
    text-transform: none;
    font-size: 12px;
    color: ${(props) => props.theme.primary};
`

export function ButtonFlex({
    text,
    onPress,
}: ButtonProps ): JSX.Element {
    return (
        <Button onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </Button>
    )
}

const Button = styled(TouchableOpacity)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
`

export function ButtonOptions({
    onPress,
    size = 25,
    color,
    offset = 5,
    onLayout
}: {
    onPress: () => void
    size?: number
    color?: string
    offset?: number
    onLayout?: (e: any) => void
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)

    const OptionsContainer = styled(TouchableOpacity)`
        position: absolute;
        padding-top: ${offset}px;
        padding-end: ${offset}px;
        align-self: flex-end;
    `

    return (
        <OptionsContainer onPress={onPress} onLayout={onLayout}>
            <MyMaterialIcons name="dots-vertical" size={size} color={color || theme.primary} />
        </OptionsContainer>
    )
}



