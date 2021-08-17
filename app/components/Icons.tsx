import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAppSelector } from '../types/ReduxHooks'

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
    return (
        <Feather name={name} color={color || theme.grey} size={size || 20} />
    )
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

    return <FontAwesome name={name} color={color || theme.grey} size={size || 20} />
}

