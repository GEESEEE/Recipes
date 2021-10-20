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
    type: any
    name: string

    color?: string
    size?: Spacing.Size
} & LayoutProps &
    TouchableOpacityProps

function IconButton({
    onPress,
    type: Type,
    name,

    color,
    size,

    ...rest
}: IconButtonProps): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} {...rest}>
            <Icon type={Type} name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}

export default withLayoutProps(IconButton as any)
