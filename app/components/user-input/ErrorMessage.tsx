import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

type ErrorMessageProps = {
    errorMessage?: string
    size?: 'Small' | 'Medium' | 'Large'
}

export const ErrorMessage = ({
    errorMessage,
    size,
}: ErrorMessageProps): JSX.Element => {
    let fontSize
    let paddingHeight
    switch(size) {
        case 'Small': {
            fontSize = 10
            paddingHeight = 16
            break
        }

        case 'Medium': {
            fontSize = 13
            paddingHeight = 19.9
            break
        }

        case 'Large': {
            fontSize = 16
            paddingHeight = 23.5
            break
        }

        default: {
            fontSize = 10
            paddingHeight = 16
            break
        }
    }

    const BottomPadding = styled(View)`
        height: ${paddingHeight}px;
    `

    const ErrorMessageView = styled(Text)`
        color: ${(props) => props.theme.error};
        font-size: ${fontSize}px;
        padding: 1px;
    `

    return (
    <Container>
        {errorMessage ? (
            <ErrorMessageView>{errorMessage}</ErrorMessageView>
        ) : (
            <BottomPadding/>
        )}
    </Container>
)}

const Container = styled(View)`
    align-self: center;
`


