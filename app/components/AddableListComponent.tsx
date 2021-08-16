import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import styled from 'styled-components'
import colors from '../config/colors'
import MyButton from './MyButton'

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

            <MyButton
                text={buttonText}
                onPress={onButtonClick}
                inverted
                viewStyle={styles.button}
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

const styles = StyleSheet.create({
    button: {
        width: '50%',
        marginTop: 10,
        marginBottom: 0,
    },
})
