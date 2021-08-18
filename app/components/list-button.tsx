import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { ButtonBorderless } from './user-input/buttons'

export default function ListButtonComponent({
    children,
    headerText,
    buttonText,
    onButtonClick,
}: {
    children: JSX.Element[]
    headerText: string
    buttonText: string
    onButtonClick: () => void
}): JSX.Element {
    return (
        <Container>
            <Header>
                <HeaderText>{headerText}</HeaderText>
            </Header>

            {children}

            <ButtonBorderless text={buttonText} onPress={onButtonClick} />
        </Container>
    )
}

const Container = styled(View)`
    margin-top: 8px;
    margin-bottom: 8px;
    padding-top: 5px;
    border-radius: 12px;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    width: 85%;
    border-width: 3px;
    border-color: ${(props) => props.theme.primary};
`

const Header = styled(View)`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    background-color: ${(props) => props.theme.background};
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
    padding-bottom: 5px;
`
const HeaderText = styled(Text)`
    flex: 1px;
    font-size: 18px;
    text-align: center;
    color: ${(props) => props.theme.text};
`
