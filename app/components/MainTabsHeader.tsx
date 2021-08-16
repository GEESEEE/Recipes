import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import styled from 'styled-components'
import Feather from "react-native-vector-icons/Feather"
import { useSelector } from "react-redux"
import colors from "../config/colors"



export const MainTabsHeader = ({navigation} : { navigation: any}): JSX.Element => {
    const theme = useSelector((state: any) => state.theme)

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.drawerButton}>
                    <TouchableOpacity onPress={handleDrawerButton}>
                        <Feather name="menu" size={30} color={theme.background}/>
                    </TouchableOpacity>
                </View>

                <HeaderTitle>Header </HeaderTitle>
            </View>
        </View>

    )
}


const HeaderTitle = styled(Text)`
    paddingLeft: 10px;
    flex: 1px;
    fontWeight: bold;
    fontSize: 20px;
    color: ${(props) => props.theme.background};
    letterSpacing: 1px;
`


const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingTop: 30,
        backgroundColor: colors.primary,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
    },
    drawerButton: {
       // marginLeft: 10,
    },
})
