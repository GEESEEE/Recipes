import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

export type TextProps = {
    children: React.ReactNode
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
}

function withTextProps<T extends TextProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    return ({
        children,
        type,
        weight,
        color,

        ...rest
    }: T): JSX.Element => {
        const { settings } = useAppSelector((state) => state)

        type = type || 'Text'

        const StyledComponent = styled(WrappedComponent as any)`
            ${Typography.textStyle(type, settings.textSize, { color, weight })}
        `

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledComponent {...rest}>{children}</StyledComponent>
        )
    }
}

export default withTextProps
