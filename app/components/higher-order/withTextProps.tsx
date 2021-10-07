import React from 'react'
import { TextProps as RNTextProps } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

export type TextProps = {
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
} & RNTextProps

function withTextProps<T extends React.PropsWithChildren<TextProps>>(
    WrappedComponent: React.ComponentType<
        Omit<T, "type" | "weight" | "color" | "children" | "style">
    >
): (props: any) => JSX.Element {

    return ({
        type,
        weight,
        color,
        children,
        style,
        ...rest
    }: T): JSX.Element => {
        const { theme, textSize } = useAppSelector((state) => state.settings)
        type = type || 'Text'
        weight = weight || Typography.textWeight[type]
        color = color || theme.text

        const fs = Typography.fontSize(type, textSize)
        const lh = Typography.lineHeight(type, textSize)

        return (

            <WrappedComponent
                style={[
                    {
                        fontSize: fs,
                        lineHeight: lh,
                        color,
                        ...Typography.fontWeight[weight]
                    },
                    style
                ]}

                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </WrappedComponent>
        )
    }
}

export default withTextProps
