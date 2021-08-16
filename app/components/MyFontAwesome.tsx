import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../config/colors'

export default function MyFontAwesome({
    name,
    color,
    size,
}: {
    name: string
    color?: string
    size?: number
}): JSX.Element {
    return <FontAwesome name={name} color={color} size={size} />
}

MyFontAwesome.defaultProps = {
    color: colors.grey,
    size: 20
}
