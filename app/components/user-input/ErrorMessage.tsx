import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

export const ErrorMessage = ({
    errorMessage,
}: {
    errorMessage?: string
}): JSX.Element => (
    <View>
        {errorMessage ? (
            <ErrorMessageView>{errorMessage}</ErrorMessageView>
        ) : (
            <BottomPadding />
        )}
    </View>
)

const BottomPadding = styled(View)`
    height: 14px;
`

const ErrorMessageView = styled(Text)`
    color: ${(props) => props.theme.error};
    font-size: 10px;
    padding: 0px;
`
