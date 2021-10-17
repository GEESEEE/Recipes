import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAppSelector } from '@/hooks'

interface MyIconProps {
    name: string
    size?: number
    color?: string
}

export function MyFeather({ name, size, color }: MyIconProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    return <Feather name={name} color={color || theme.grey} size={size || 20} />
}

export function MyFontAwesome({ name, color, size }: MyIconProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <FontAwesome
            name={name}
            color={color || theme.grey}
            size={size || 20}
        />
    )
}

export function MyMaterialCommunityIcons({
    name,
    color,
    size,
}: MyIconProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <MaterialCommunityIcons
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
}: MyIconProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <MaterialIcons
            name={name}
            color={color || theme.grey}
            size={size || 20}
        />
    )
}

export function MyIonicons({ name, color, size }: MyIconProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Ionicons name={name} color={color || theme.grey} size={size || 20} />
    )
}