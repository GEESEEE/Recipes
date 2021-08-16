import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../config/colors'

export default function MyFeather({
    name,
    size,
    color,
}: {
    name: string
    size?: number
    color?: string
}): JSX.Element {
    return (
        <Feather name={name} color={color} size={size} />
    )
}

MyFeather.defaultProps = {
    size: 20,
    color: colors.black
}
