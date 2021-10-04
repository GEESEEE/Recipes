import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography} from '@/styles'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'

type TextProps = {
    children: React.ReactNode
    type?: Typography.TextType
    weight?: Typography.TextWeight
    color?: string
}
& PaddingAndMarginProps
& RNTextProps

const Text = ({
    children,
    type,
    weight,
    color,
    ...rest
}: TextProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)

    type = type || 'Text'

    const StyledText = styled(RNText)`
        ${Typography.textStyle(type, settings.textSize, {color, weight})}
    `

    return (

        <StyledText
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </StyledText>
    )
}

export default withPaddingAndMargins(Text)
