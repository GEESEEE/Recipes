import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import colors from "../config/colors"



export const MainTabsHeader = ({navigation} :{ navigation: any}): JSX.Element => {

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.drawerButton}>
                    <TouchableOpacity onPress={handleDrawerButton}>
                        <Feather name="menu" size={30} color={colors.white}/>
                    </TouchableOpacity>
                </View>


                <Text style={styles.headerTitle}>Header </Text>
            </View>
        </View>

    )
}




const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.primary,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    drawerButton: {
        marginLeft: 10,
    },
    headerTitle: {
        paddingLeft: 10,
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.white,
        letterSpacing: 1,
    }
})
