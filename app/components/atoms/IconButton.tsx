import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Icon from './Icon'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { Spacing } from '@/styles'

type IconButtonProps = {
    onPress: () => void
    IconType: any
    iconName: string

    color?: string
    size?: Spacing.Size
} & LayoutProps &
    TouchableOpacityProps

function IconButton({
    onPress,
    IconType,
    iconName,

    color,
    size,

    ...rest
}: IconButtonProps): JSX.Element {
    return (
        <View
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <Icon Type={IconType} name={iconName} color={color} size={size} />
            </TouchableOpacity>
        </View>
    )
}

export default withLayoutProps(IconButton)
