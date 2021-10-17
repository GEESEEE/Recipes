import React from 'react'
import { TextProps as RNTextProps } from 'react-native'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

export type TextProps = {
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
    transform?: Typography.TextTransform
} & RNTextProps

function withTextProps<T extends React.PropsWithChildren<TextProps>>(
    WrappedComponent: React.ComponentType<
        Omit<
            T,
            'type' | 'weight' | 'color' | 'children' | 'transform' | 'style'
        >
    >
): (props: any) => JSX.Element {
    return ({
        type,
        weight,
        color,
        children,
        transform,
        style,
        ...rest
    }: T): JSX.Element => {
        const { theme, textSize } = useAppSelector((state) => state.settings)

        type = type || 'Text'
        weight = weight || Typography.textWeight[type]
        color = color || theme.text

        const lineHeight = Typography.lineHeight(type, textSize)

        const textStyle = {
            fontSize: Typography.fontSize(type, textSize),
            lineHeight,
            color,
            ...Typography.fontWeight[weight],
            textTransform: transform,
        }

        return (
            <WrappedComponent
                style={[textStyle, style]}
                type={type}
                weight={weight}
                color={color}
                transform={transform}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </WrappedComponent>
        )
    }
}

export default withTextProps
