import React from 'react'
import styled from 'styled-components'
import { View, ViewProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type IconProps = {
    Type: any
    name: string

    color?: string
    size?: Spacing.Size

    textSize?: Typography.TextSize
} & LayoutProps & ViewProps

function Icon({
    Type: IconType,
    name,
    color,
    size,
    ...rest
}: IconProps): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)

    color = color || theme.primary
    size = size || 's'
    const iconSize = Spacing.iconSize(size, textSize)

    return (
        <StyledView
            textSize={textSize}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <IconType
                name={name}
                color={color}
                size={iconSize}
            />
        </StyledView>
    )
}

export default withLayoutProps(Icon)

const StyledView = styled(View).attrs(({
    size,
    textSize
}: IconProps) => {
    size = size || 's'
    textSize = textSize || 'm'

    return {
        width: Spacing.iconSize(size, textSize)
    }
})`
    align-items: center;
    justify-content: center;
`
