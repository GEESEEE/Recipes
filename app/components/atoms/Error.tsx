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
    const { settings } = useAppSelector((state) => state)
    size = size || 's'

    const textType = sizeMap[size]

    const ErrorMessageView = styled(Text)`
        color: ${(props) => props.theme.error};
    `

    const Padding = styled(View)`
        height: ${Typography.lineHeight(textType, settings.textSize)}px;
    `

    return (
        <Container>
            {errorMessage ? (
                <ErrorMessageView type={textType}>
                    {errorMessage}
                </ErrorMessageView>
            ) : (
                <Padding />
            )}
        </Container>
    )
}

export default ErrorMessage

const Container = styled(View)`
    align-self: center;
`
