import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing } from '@/styles'
import Icon from '../base/Icon'

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
