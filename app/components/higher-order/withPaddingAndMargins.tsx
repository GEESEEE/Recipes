import React from 'react'
import styled from 'styled-components'
import { Spacing } from '@/styles'

export type PaddingAndMarginProps = {
    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size
}

function withPaddingAndMargin<T extends PaddingAndMarginProps>(WrappedComponent: React.ComponentType<T>):
    (props: T) => JSX.Element {

    return ({
        marginHorizontal,
        marginVertical,
        paddingHorizontal,
        paddingVertical,
        ...rest
    }: T): JSX.Element => {

        let styles = ''
        if (marginVertical) styles += Spacing.marginVertical(marginVertical)
        if (marginHorizontal) styles += Spacing.marginHorizontal(marginHorizontal)
        if (paddingVertical) styles += Spacing.paddingVertical(paddingVertical)
        if (paddingHorizontal) styles += Spacing.paddingHorizontal(paddingHorizontal)

        const StyledComponent = styled(WrappedComponent as any)`
            ${styles}
        `

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledComponent {...rest}/>
        )
    }


}

export default withPaddingAndMargin
