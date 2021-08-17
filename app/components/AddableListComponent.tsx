import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { ButtonBorderless } from './Buttons'

export default function AddableListComponent({
    children,
    headerText,
    buttonText,
    onButtonClick,
}:{
    children: JSX.Element[],
    headerText: string
    buttonText: string,
    onButtonClick: () => void
}): JSX.Element {

    return (
        <Container>
            <Header>
                <HeaderText>{headerText}</HeaderText>
            </Header>

            {children}

            <ButtonBorderless
                text={buttonText}
                onPress={onButtonClick}
            />
        </Container>
    )
}

const Container = styled(View)`
    marginTop: 8px;
    marginBottom: 8px;
    paddingTop: 5px;
    borderRadius: 12px;
    flexDirection: column;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background};
    width: 85%;
    borderWidth: 3px;
    borderColor: ${(props) => props.theme.primary};
`

const Header = styled(View)`
    flexDirection: row;
    alignItems: flex-end;
    justifyContent: center;
    backgroundColor: ${(props) => props.theme.background};
    borderBottomColor: ${(props) => props.theme.primary};
    borderBottomWidth: 1px;
    paddingBottom: 5px;
`
const HeaderText = styled(Text)`
    flex: 1px;
    fontSize: 18px;
    textAlign: center;
    color: ${(props) => props.theme.text};
`
