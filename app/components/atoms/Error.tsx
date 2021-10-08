import React from 'react'
import styled from 'styled-components'
import View from './View'
import Text from './Text'
import { Spacing, Typography } from '@/styles'
import { useAppSelector } from '@/hooks'

type ErrorMessageProps = {
    errorMessage?: string
    size?: Spacing.Size
}

const sizeMap: Record<Spacing.Size, Typography.TextType> = {
    s: 'TinyText',
    m: 'SubText',
    l: 'Text',
}

function ErrorMessage({ errorMessage, size }: ErrorMessageProps): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)
    size = size || 's'

    const textType = sizeMap[size]

    const paddingStyle = {
        height: Typography.lineHeight(textType, textSize) + .1
    }

    return (
        <Container>
            {errorMessage ? (
                <Text type={textType} color={theme.error}>
                    {errorMessage}
                </Text>
            ) : (
                <View style={paddingStyle}/>
            )}
        </Container>
    )
}

export default ErrorMessage

const Container = styled(View)`
    align-self: center;
`
