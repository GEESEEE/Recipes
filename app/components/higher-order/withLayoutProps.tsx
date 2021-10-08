import React from 'react'
import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { Spacing } from '@/styles'
import { utils } from '@/config'

export type LayoutProps = {
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size

    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size

    borderRadius?: Spacing.Size
    width?: Spacing.Size
} & React.PropsWithChildren<ViewProps>

function withLayoutProps<T extends LayoutProps>(
    WrappedComponent: React.ComponentType<
    { style: StyleProp<ViewStyle>[]; }
    & Omit<T,
    "paddingVertical"
    | "paddingHorizontal"
    | "marginVertical" | "marginHorizontal" | "borderRadius" | "width" | "style" | "children">
    >
): (props: any) => JSX.Element {
    return ({
        paddingVertical,
        paddingHorizontal,
        marginVertical,
        marginHorizontal,
        borderRadius,
        width,
        style,
        children,
        ...rest
    }: T): JSX.Element => {
        // console.log("withLayout", style)

        const myStyle: StyleProp<ViewStyle> = {}

        if (paddingVertical) myStyle.paddingVertical = Spacing.spacings[paddingVertical]
        if (paddingHorizontal) myStyle.paddingHorizontal = Spacing.spacings[paddingHorizontal]

        if (marginVertical) myStyle.marginVertical = Spacing.spacings[marginVertical]
        if (marginHorizontal) myStyle.marginHorizontal = Spacing.spacings[marginHorizontal]

        if (borderRadius) myStyle.borderRadius = Spacing.borderRadii[borderRadius]
        if (width) myStyle.width = Spacing.widths[width]

        return (
            <WrappedComponent
                style={[myStyle, style]}
                // I can not pass the layout props through to the inheritors, because it crashes for some reason :|
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </WrappedComponent>
        )
    }
}

export default withLayoutProps
