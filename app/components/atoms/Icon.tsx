import React from 'react'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing } from '@/styles'

type IconProps = {
    Type: any
    name: string

    color?: string
    size?: Spacing.Size
} & LayoutProps

function Icon({
    Type: IconType,
    name,
    color,
    size,
}: IconProps): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    color = color || theme.primary
    size = size || 's'

    return <IconType name={name} color={color} size={Spacing.iconSize(size, settings.textSize)} />
}

export default withLayoutProps(Icon)