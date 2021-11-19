import React from 'react'
import Loading4Dots from './Loading4Dots'
import {
    Icon,
    TouchableOpacity,
    TouchableOpacityProps,
} from '@/components/base'
import {
    withLayoutProps,
    LayoutProps,
    withSubCount,
    SubCountProps,
} from '@/components/higher-order'
import { Spacing } from '@/styles'
import { useSettings } from '@/hooks'
import { TouchableEvent } from '@/types'

export type IconButtonProps = {
    onPress: (e: TouchableEvent) => void
    type: any
    name: string

    loading?: boolean
    color?: string
    size?: Spacing.Size
} & LayoutProps &
    SubCountProps &
    TouchableOpacityProps

function IconButton({
    onPress,
    type,
    name,

    loading,
    color,
    backgroundColor,
    size,
    disabled,

    ...rest
}: IconButtonProps): JSX.Element {
    const { theme, textSize } = useSettings()
    size = size || 's'
    console.log('IconButton', backgroundColor, color)

    const iconSize = Spacing.iconSize(size, textSize)
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <Loading4Dots
                    width={iconSize}
                    dotColor={color}
                    backgroundColor={backgroundColor}
                />
            ) : (
                <Icon
                    type={type}
                    name={name}
                    color={color}
                    size={size}
                    backgroundColor={backgroundColor}
                />
            )}
        </TouchableOpacity>
    )
}

export default withSubCount(withLayoutProps(IconButton))
