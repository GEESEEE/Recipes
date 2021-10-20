import React from 'react'
import styled from 'styled-components'
import View from './View'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type IconProps = {
    type: any
    name: string

    color?: string
    size?: Spacing.Size

    textSize?: Typography.TextSize
} & LayoutProps

function Icon({
    type: Type,
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
            <Type name={name} color={color} size={iconSize} />
        </StyledView>
    )
}

export default withLayoutProps(Icon)

const StyledView = styled(View)`
    align-items: center;
    justify-content: center;
`
