import React from 'react'
import { View as RNView, ViewProps as RNViewProps} from 'react-native'
import styled from 'styled-components'
import { Spacing } from '@/styles'

type ViewProps = {
    children: JSX.Element[]
    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size
} & RNViewProps

const View = ({
    children,
    style,
    marginVertical,
    marginHorizontal,
    paddingVertical,
    paddingHorizontal
}: ViewProps): JSX.Element => {

    let styles = ''
    if (marginVertical) styles += Spacing.marginVertical(marginVertical)
    if (marginHorizontal) styles += Spacing.marginHorizontal(marginHorizontal)
    if (paddingVertical) styles += Spacing.paddingVertical(paddingVertical)
    if (paddingHorizontal) styles += Spacing.paddingHorizontal(paddingHorizontal)

    const StyledView = styled(RNView)`
        ${styles}
    `

    return (
    <StyledView
        style={[style]}
    >
        {children}
    </StyledView>
    )
}

export default View
