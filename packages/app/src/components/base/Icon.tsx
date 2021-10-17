import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type IconProps = {
    Type: any
    name: string

    color?: string
    size?: Spacing.Size

    textSize?: Typography.TextSize
} & LayoutProps

function Icon({
    Type: IconType,
    name,
    color,
    size,
    style,
    ...rest
}: IconProps): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)

    color = color || theme.primary
    size = size || 's'
    const iconSize = Spacing.iconSize(size, textSize)

    return (
        <StyledView
            style={[
                {
                    width: iconSize,
                },
                style,
            ]}
            {...rest}
        >
            <IconType name={name} color={color} size={iconSize} />
        </StyledView>
    )
}

export default withLayoutProps(Icon as any)

const StyledView = styled(View)`
    align-items: center;
    justify-content: center;
`
