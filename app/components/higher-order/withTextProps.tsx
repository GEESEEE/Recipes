import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

type TextProps = React.PropsWithChildren<{
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
    textSize?: Typography.TextSize
}>

function withTextProps<T extends TextProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    const StyledComponent = styled(WrappedComponent as any).attrs(
        ({ type, weight, color, textSize }: T) => {
            type = type || 'Text'
            textSize = textSize || 'm'
            weight = weight || Typography.textWeight[type]

            return {
                fontSize: Typography.fontSize(type, textSize),
                lineHeight: Typography.lineHeight(type, textSize),
                color,
                ...Typography.fontWeight[weight],
            }
        }
    )``

    return ({ children, ...rest }: T): JSX.Element => {
        const { theme, textSize } = useAppSelector((state) => state.settings)

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledComponent color={theme.text} textSize={textSize} {...rest}>
                {children}
            </StyledComponent>
        )
    }
}

export default withTextProps
