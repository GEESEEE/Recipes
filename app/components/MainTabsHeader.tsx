import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import styled from 'styled-components'
import Feather from "react-native-vector-icons/Feather"
import { useSelector } from "react-redux"



export const MainTabsHeader = ({navigation} : { navigation: any}): JSX.Element => {
    const theme = useSelector((state: any) => state.theme)

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    return (
        <Container>
            <Header>

                <TouchableOpacity onPress={handleDrawerButton}>
                    <Feather name="menu" size={30} color={theme.background}/>
                </TouchableOpacity>

                <HeaderTitle>Header </HeaderTitle>
            </Header>
        </Container>

    )
}

const Container = styled(View)`
    height: 70px;
    paddingTop: 30px;
    backgroundColor: ${(props) => props.theme.primary};
`

const Header = styled(View)`
    flex: 1;
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    marginLeft: 15px;
    marginRight: 15px;
    marginBottom: 0px;
    backgroundColor: ${(props) => props.theme.primary};
`

const HeaderTitle = styled(Text)`
    paddingLeft: 10px;
    flex: 1px;
    fontWeight: bold;
    fontSize: 20px;
    color: ${(props) => props.theme.background};
    letterSpacing: 1px;
`


const styles = StyleSheet.create({

    drawerButton: {
       // marginLeft: 10,
    },
})
