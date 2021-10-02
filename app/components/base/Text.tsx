import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Spacing, Typography} from '@/styles'

type TextType = 'header' | 'subHeader' | 'text' | 'subText' | 'tinyText'

type TextProps = {
    children: any
    type: TextType
    marginVertical?: Spacing.Size
    marginHorizontal?: Spacing.Size
    paddingVertical?: Spacing.Size
    paddingHorizontal?: Spacing.Size
} & RNTextProps

const Text = ({
    style,
    children,
    type,
    marginVertical,
    marginHorizontal,
    paddingVertical,
    paddingHorizontal
}: TextProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)

    let styles = ''
    if (marginVertical) styles += Spacing.marginVertical(marginVertical)
    if (marginHorizontal) styles += Spacing.marginHorizontal(marginHorizontal)
    if (paddingVertical) styles += Spacing.paddingVertical(paddingVertical)
    if (paddingHorizontal) styles += Spacing.paddingHorizontal(paddingHorizontal)

    const StyledText = styled(RNText)`
        ${styles}
        ${Typography[type](settings.textSize)}
    `

    return (
        <StyledText
            style={[style]}
        >
            {children}
        </StyledText>
    )
}

export default Text
