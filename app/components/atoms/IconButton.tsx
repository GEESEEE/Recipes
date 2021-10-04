import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Icon from './Icon'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { Spacing } from '@/styles'

type IconButtonProps = {
    onPress: () => void
    IconType: any
    iconName: string

    color?: string
    size?: Spacing.Size
}
& PaddingAndMarginProps
& TouchableOpacityProps

function IconButton({
    onPress,
    IconType,
    iconName,

    color,
    size,

    ...rest
}: IconButtonProps): JSX.Element {
    console.log("Button", onPress, IconType, iconName, size, color)
    return (
        <TouchableOpacity
            onPress={onPress}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <Icon
                Type={IconType}
                name={iconName}
                color={color}
                size={size}
            />
        </TouchableOpacity>
    )
}

export default withPaddingAndMargins(IconButton)
