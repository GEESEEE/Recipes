import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography} from '@/styles'
import { withPaddingAndMargins } from '@/components/higher-order'
import { PaddingAndMarginProps } from '../higher-order/withPaddingAndMargins'

type TextProps = {
    children: React.ReactNode
    type: Typography.TextType
}
& PaddingAndMarginProps
& RNTextProps

const Text = ({
    style,
    children,
    type,
}: TextProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)

    const StyledText = styled(RNText)`
        ${Typography.textStyle(type, settings.textSize)}
    `

    return (
        <StyledText
            style={[style]}
        >
            {children}
        </StyledText>
    )
}

export default withPaddingAndMargins(Text)
