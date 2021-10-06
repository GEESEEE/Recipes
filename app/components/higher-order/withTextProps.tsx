import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

export type TextProps = {
    children?: React.ReactNode
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
    textSize?: Typography.TextSize
}

function withTextProps<T extends TextProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {

    const StyledComponent = styled(WrappedComponent as any).attrs(({
        type,
        weight,
        color,
        textSize,
    }: T) => {
        type = type || 'Text'
        textSize = textSize || 'm'
        weight = weight || Typography.textWeight[type]

        return {
            fontSize: Typography.fontSize(type, textSize),
            lineHeight: Typography.lineHeight(type, textSize),
            color,
            ...Typography.fontWeight[weight]
        }
    })``

    return ({
        children,
        ...rest
    }: T): JSX.Element => {
        const { settings } = useAppSelector((state) => state)

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledComponent color={settings.theme.text} textSize={settings.textSize} {...rest}>
                {children}
            </StyledComponent>
        )
    }
}

export default withTextProps
