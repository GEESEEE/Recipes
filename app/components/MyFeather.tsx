import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../config/colors'

export default function MyFeather({ name }: { name: string }): JSX.Element {
    return <Feather name={name} color={colors.grey} size={20} />
}
