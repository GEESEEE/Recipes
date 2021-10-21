import React from 'react'
import Loading4Dots from './Loading4Dots'
import {
    Icon,
    TouchableOpacity,
    TouchableOpacityProps,
} from '@/components/base'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { Spacing } from '@/styles'
import { useAppSelector } from '@/hooks'
import { TouchableEvent } from '@/types'

type IconButtonProps = {
    onPress: (e?: TouchableEvent) => void
    type: any
    name: string

    loading?: boolean
    color?: string
    size?: Spacing.Size
} & LayoutProps &
    TouchableOpacityProps

function IconButton({
    onPress,
    type,
    name,

    loading,
    color,
    size,

    ...rest
}: IconButtonProps): JSX.Element {
    const { textSize } = useAppSelector((state) => state.settings)
    size = size || 's'
    const iconSize = Spacing.iconSize(size, textSize)
    return (
        <TouchableOpacity onPress={onPress} disabled={loading} {...rest}>
            {loading ? (
                <Loading4Dots width={iconSize} />
            ) : (
                <Icon type={type} name={name} color={color} size={size} />
            )}
        </TouchableOpacity>
    )
}

export default withLayoutProps(IconButton)
