import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux'
import { MyMaterialCommunityIcons } from '../Icons'

export type ButtonProps = {
    text: string
    onPress: () => void
}

const ButtonStyleGeneric = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    width: 80%;
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
    color,
}: ButtonProps & { color?: string }): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    return (
        <ButtonFilledStyle
            onPress={onPress}
            style={{ backgroundColor: color ?? theme.primary }}
        >
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

export function ButtonInverted({ text, onPress }: ButtonProps): JSX.Element {
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

export function ButtonBorderless({ text, onPress }: ButtonProps): JSX.Element {
    return (
        <ButtonBorderlessStyle onPress={onPress}>
            <ButtonBorderlessText>{text}</ButtonBorderlessText>
        </ButtonBorderlessStyle>
    )
}

const ButtonBorderlessStyle = styled(ButtonStyleGeneric)`
    width: 50%;
    background-color: ${(props) => props.theme.background};
    margin-top: 4px;
    margin-bottom: 4px;
`

const ButtonBorderlessText = styled(ButtonTextGeneric)`
    font-weight: normal;
    text-transform: none;
    font-size: 12px;
    color: ${(props) => props.theme.primary};
`

export function ButtonOptions({
    onPress,
    size = 25,
    color,
    offset = 5,
    onLayout,
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
        align-self: flex-end;
        top: 0px;
        right: 0px;
        margin-top: ${offset}px;
        margin-end: ${offset}px;
    `

    return (
        <OptionsContainer onPress={onPress} onLayout={onLayout}>
            <MyMaterialCommunityIcons
                name="dots-vertical"
                size={size}
                color={color || theme.primary}
            />
        </OptionsContainer>
    )
}

export function ButtonIcon({
    onPress,
    icon,
    disabled,
}: {
    onPress: () => void
    icon: JSX.Element
    disabled?: boolean
}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled ?? false}>
            {icon}
        </TouchableOpacity>
    )
}

export function FeatherButton({
    iconName,
    onPress,
    size,
    color,
}: {
    iconName: string
    onPress: () => void
    size?: number
    color?: string
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    return (
        <ButtonIcon
            onPress={onPress}
            icon={
                <Feather
                    name={iconName}
                    size={size || 30}
                    color={color || theme.primary}
                />
            }
        />
    )
}

export function ReturnButton({
    onPress,
    color,
}: {
    onPress: () => void
    color?: string
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    return (
        <ReturnButtonContainer>
            <FeatherButton
                iconName="arrow-left"
                onPress={() => onPress()}
                size={35}
                color={color ?? theme.primary}
            />
        </ReturnButtonContainer>
    )
}

const ReturnButtonContainer = styled(View)`
    width: 100%;
    height: 50px;
    padding-left: 10px;
`
