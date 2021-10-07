import React from 'react'
import { ViewProps } from 'react-native'
import { Spacing } from '@/styles'

export type LayoutProps = {
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size

    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size

    borderRadius?: Spacing.Size
    width?: Spacing.Size
} & ViewProps

function withLayoutProps<T extends React.PropsWithChildren<LayoutProps>>(
    WrappedComponent: React.ComponentType<
    Omit<T,
        "paddingVertical"
        | "paddingHorizontal"
        | "marginVertical"
        | "marginHorizontal"
        | "borderRadius"
        | "width"
        | "style"
        | "children"
        >
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
    }: T): JSX.Element  => {
        const pv = (paddingVertical ? Spacing.spacings[paddingVertical] : 0)
        const ph = (paddingHorizontal ? Spacing.spacings[paddingHorizontal] : 0)

        const mv = (marginVertical ? Spacing.spacings[marginVertical ] : 0)
        const mh = (marginHorizontal ? Spacing.spacings[marginHorizontal] : 0)

        const br = (borderRadius ? Spacing.borderRadii[borderRadius] : 0)
        const w = (width ? `${Spacing.widths[width]}%` : undefined)
        return (
            <WrappedComponent
                style={[
                    {
                        paddingVertical: pv,
                        paddingHorizontal: ph,

                        marginVertical: mv,
                        marginHorizontal: mh,

                        borderRadius: br,
                        width: w
                    },
                    style
                ]}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </WrappedComponent>
        )}
}

export default withLayoutProps
