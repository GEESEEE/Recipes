import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../config/colors'

export default function MyFontAwesome({
    name,
    size,
}: {
    name: string
    size?: number
}): JSX.Element {
    return <FontAwesome name={name} color={colors.grey} size={size ?? 20} />
}
