import React from 'react'
import styled from 'styled-components'
import { Spacing } from '@/styles'

export type LayoutProps = {
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size

    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size

    borderRadius?: Spacing.Size
    width?: Spacing.Size
}

function withLayoutProps<T extends LayoutProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    const StyledComponent = styled(WrappedComponent as any).attrs(
        ({
            paddingHorizontal,
            paddingVertical,

            marginHorizontal,
            marginVertical,

            borderRadius,
            width,
        }: T) => ({
            paddingVertical: paddingVertical
                ? Spacing.spacings[paddingVertical]
                : 0,
            paddingHorizontal: paddingHorizontal
                ? Spacing.spacings[paddingHorizontal]
                : 0,
            marginVertical: marginVertical
                ? Spacing.spacings[marginVertical]
                : 0,
            marginHorizontal: marginHorizontal
                ? Spacing.spacings[marginHorizontal]
                : 0,
            borderRadius: borderRadius ? Spacing.borderRadii[borderRadius] : 0,
            width: width ? `${Spacing.widths[width]}%` : undefined,
        })
    )``

    return ({ ...rest }: T): JSX.Element => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledComponent {...rest} />
    )
}

export default withLayoutProps
