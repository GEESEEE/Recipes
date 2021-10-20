import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styled from 'styled-components'

const Popup = (): JSX.Element => {
    const route = useRoute()
    const navigation = useNavigation() as any
    const { title, description } = route.params as any

    const confirmText = 'OK'

    return (
        <Container>
            <PopupMenu>
                <PopupTitle>{title ?? 'Title'}</PopupTitle>

                {description ? (
                    <PopupDescription>{description}</PopupDescription>
                ) : undefined}

                <ReturnButton onPress={() => navigation.pop()}>
                    <ReturnText>{confirmText}</ReturnText>
                </ReturnButton>
            </PopupMenu>
        </Container>
    )
}

export default Popup

const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const PopupMenu = styled(View)`
    width: 50%;
    background-color: ${(props) => props.theme.background};
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border-width: 2px;
    border-color: ${(props) => props.theme.primary};
`

const PopupTitle = styled(Text)`
    color: ${(props) => props.theme.primary};
    font-size: 18px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
`

const PopupDescription = styled(Text)`
    color: ${(props) => props.theme.text};
    font-size: 14px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
`

const ReturnButton = styled(TouchableOpacity)`
    width: 100%;
    padding: 8px;
    align-items: center;
`

const ReturnText = styled(Text)`
    color: ${(props) => props.theme.primary};
    font-size: 14px;
    font-weight: bold;
`
