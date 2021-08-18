import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import { useAppSelector } from '../../types/ReduxHooks'

const Header = ({
    navigation,
}: {
    navigation: any
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    return (
        <Container>
            <HeaderContainer>
                <TouchableOpacity onPress={handleDrawerButton}>
                    <Feather name="menu" size={30} color={theme.background} />
                </TouchableOpacity>

                <HeaderTitle>Header </HeaderTitle>
            </HeaderContainer>
        </Container>
    )
}

export default Header

const Container = styled(View)`
    height: 70px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.primary};
`

const HeaderContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 0px;
    background-color: ${(props) => props.theme.primary};
`

const HeaderTitle = styled(Text)`
    padding-left: 10px;
    flex: 1px;
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => props.theme.background};
    letter-spacing: 1px;
`
