import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import styled from 'styled-components'
import { withPaddingAndMargins, PaddingAndMarginProps } from '../higher-order'

type ButtonType = 'filled' | 'inverted'

type ButtonProps = {
    type: ButtonType
}
& PaddingAndMarginProps
& PressableProps

const Button = ({type, ...rest}: ButtonProps): JSX.Element => {
    console.log(type)

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Pressable {...rest}/>
    )}

export default withPaddingAndMargins(Button)
