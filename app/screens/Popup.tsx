import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import { ButtonInverted } from '../components/user-input/Buttons'

const Popup = ({ navigation }: { navigation: any}): JSX.Element => {
    const { params } = navigation.state
    const {title} = params

    return (
        <Container>
            <PopupMenu>
                <PopupTitle>{title ?? "Title"}</PopupTitle>
                <ButtonInverted text="Ok" onPress={() => navigation.goBack()}/>
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
    background-color: ${(props) => props.theme.background};
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`

const PopupTitle = styled(Text)`
    color: ${(props) => props.theme.primary};
    font-size: 16px;
`

const ReturnButton = styled(TouchableOpacity)`

`
