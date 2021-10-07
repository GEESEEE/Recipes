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
} & React.PropsWithChildren<ViewProps>

function withLayoutProps<T extends LayoutProps>(
    WrappedComponent: React.ComponentType<
        Omit<
            T,
            | 'paddingVertical'
            | 'paddingHorizontal'
            | 'marginVertical'
            | 'marginHorizontal'
            | 'borderRadius'
            | 'width'
            | 'style'
            | 'children'
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
    }: T): JSX.Element => {
        console.log(width, borderRadius)
        const pv = paddingVertical
            ? Spacing.spacings[paddingVertical]
            : undefined
        const ph = paddingHorizontal
            ? Spacing.spacings[paddingHorizontal]
            : undefined

        const mv = marginVertical ? Spacing.spacings[marginVertical] : undefined
        const mh = marginHorizontal
            ? Spacing.spacings[marginHorizontal]
            : undefined

        const br = borderRadius ? Spacing.borderRadii[borderRadius] : undefined
        const w = width ? `${Spacing.widths[width]}%` : undefined
        return (
            <WrappedComponent
                style={[
                    {
                        paddingVertical: pv,
                        paddingHorizontal: ph,

                        marginVertical: mv,
                        marginHorizontal: mh,

                        borderRadius: br,
                        width: w,
                    },
                    style,
                ]}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </WrappedComponent>
        )
    }
}

export default withLayoutProps
