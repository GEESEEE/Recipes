import React from 'react'
import {
    Icon,
    TouchableOpacity,
    TouchableOpacityProps,
} from '@/components/base'
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
        <TouchableOpacity
            onPress={onPress}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <Icon Type={IconType} name={iconName} color={color} size={size} />
        </TouchableOpacity>
    )
}

export default withLayoutProps(IconButton as any)
