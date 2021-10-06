import React from 'react'
import styled from 'styled-components'
import View from './View'
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
    ...rest
}: IconProps): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    color = color || theme.primary
    size = size || 's'

    return (
        <StyledView
            paddingVertical='l'
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <IconType
                name={name}
                color={color}
                size={Spacing.iconSize(size, settings.textSize)}
            />
        </StyledView>
    )
}

export default withLayoutProps(Icon)

const StyledView = styled(View)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`
