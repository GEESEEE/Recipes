import React from 'react'
import {Image } from 'react-native'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppSelector } from '../types/ReduxHooks'
import logo from '../assets/temp_icon.png'

export function Logo(
    {size}: {size: number}
): JSX.Element {
    const LogoView = styled(Image)`
        width: ${size}px;
        height: ${size}px;
    `
    return (
        <LogoView source={logo} />
    )
}

export function MyFeather({
    name,
    size,
    color,
}: {
    name: string
    size?: number
    color?: string
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    return <Feather name={name} color={color || theme.grey} size={size || 20} />
}

export function MyFontAwesome({
    name,
    color,
    size,
}: {
    name: string
    color?: string
    size?: number
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)

    return (
        <FontAwesome
            name={name}
            color={color || theme.grey}
            size={size || 20}
        />
    )
}

export function MyMaterialIcons({
    name,
    color,
    size,
}: {
    name: string
    color?: string
    size?: number
}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)

    return (
        <MaterialCommunityIcons
            name={name}
            color={color || theme.grey}
            size={size || 20}
        />
    )
}

