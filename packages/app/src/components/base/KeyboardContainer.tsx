import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import View from './View'
import { LayoutProps } from '@/components/higher-order'

type ContainerProps = LayoutProps

function KeyboardContainer({ children, ...rest }: ContainerProps): JSX.Element {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View {...rest}>{children}</View>
        </TouchableWithoutFeedback>
    )
}

export default KeyboardContainer
