import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { Spacing, Typography } from '@/styles'
import { useSettings } from '@/hooks'

type ErrorMessageProps = {
    message?: string
    size?: Spacing.Size
}

const sizeMap: Record<Spacing.Size, Typography.TextType> = {
    s: 'TinyText',
    m: 'SubText',
    l: 'Text',
    n: 'Text',
}

function Error({
    message: errorMessage,
    size,
}: ErrorMessageProps): JSX.Element {
    const { theme, textSize } = useSettings()
    size = size || 's'

    const textType = sizeMap[size]

    const paddingStyle = {
        height: Typography.lineHeight(textType, textSize),
    }

    return (
        <Container>
            {errorMessage ? (
                <Text type={textType} color={theme.error} fixHeight>
                    {errorMessage}
                </Text>
            ) : (
                <View style={paddingStyle} />
            )}
        </Container>
    )
}

export default Error

const Container = styled(View)`
    align-self: center;
`
