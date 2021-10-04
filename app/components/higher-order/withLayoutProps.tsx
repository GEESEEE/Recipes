import React from 'react'
import styled from 'styled-components'
import { Spacing } from '@/styles'

export type LayoutProps = {
    padding?: Spacing.Size
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size

    margin?: Spacing.Size
    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size

    roundness?: Spacing.Size
    width?: Spacing.Size
}

function withLayoutProps<T extends LayoutProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    return ({
        padding,
        paddingHorizontal,
        paddingVertical,

        margin,
        marginHorizontal,
        marginVertical,

        roundness,
        width,

        ...rest
    }: T): JSX.Element => {
        let styles = ''
        if (padding) styles += Spacing.padding(padding)
        if (paddingVertical) styles += Spacing.paddingVertical(paddingVertical)
        if (paddingHorizontal)
            styles += Spacing.paddingHorizontal(paddingHorizontal)

        if (margin) styles += Spacing.margin(margin)
        if (marginVertical) styles += Spacing.marginVertical(marginVertical)
        if (marginHorizontal)
            styles += Spacing.marginHorizontal(marginHorizontal)

        if (roundness) styles += Spacing.borderRadius(roundness)
        if (width) styles += Spacing.width(width)

        const StyledComponent = styled(WrappedComponent as any)`
            ${styles}
        `

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledComponent {...rest} />
        )
    }
}

export default withLayoutProps
