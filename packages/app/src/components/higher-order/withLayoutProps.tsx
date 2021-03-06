import React from 'react'
import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { Spacing } from '@/styles'

export type LayoutProps = {
    backgroundColor?: string

    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size

    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size

    borderRadius?: Spacing.Size
    borderWidth?: Spacing.Size
    borderColor?: string
    width?: Spacing.Size
} & React.PropsWithChildren<ViewProps>

function withLayoutProps<T extends LayoutProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    return ({
        backgroundColor,
        paddingVertical,
        paddingHorizontal,
        marginVertical,
        marginHorizontal,
        borderRadius,
        borderWidth,
        borderColor,
        width,
        style,
        children,
        ...rest
    }: T): JSX.Element => {
        const myStyle: StyleProp<ViewStyle> = {}

        if (backgroundColor) myStyle.backgroundColor = backgroundColor

        if (paddingVertical)
            myStyle.paddingVertical = Spacing.spacings[paddingVertical]
        if (paddingHorizontal)
            myStyle.paddingHorizontal = Spacing.spacings[paddingHorizontal]

        if (marginVertical)
            myStyle.marginVertical = Spacing.spacings[marginVertical]
        if (marginHorizontal)
            myStyle.marginHorizontal = Spacing.spacings[marginHorizontal]

        if (borderRadius)
            myStyle.borderRadius = Spacing.borderRadii[borderRadius]
        if (borderWidth) myStyle.borderWidth = Spacing.borderWidths[borderWidth]
        if (borderColor) myStyle.borderColor = borderColor

        if (width) myStyle.width = Spacing.widths[width]

        return (
            <WrappedComponent
                backgroundColor={backgroundColor}
                style={[myStyle, style]}
                {...(rest as T)}
            >
                {children}
            </WrappedComponent>
        )
    }
}

export default withLayoutProps
