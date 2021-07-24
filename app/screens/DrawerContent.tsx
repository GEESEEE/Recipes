import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {View, StyleSheet, ScrollView} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Text } from 'react-native-paper'
import DrawerNavigator from '../routes/Drawer'



export function DrawerContent(): JSX.Element {
    return  (
        <ScrollView>
            <SafeAreaView
                style={styles.container}
            >
                <Text>Yes</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    // userInfoSection: {
    //     paddingLeft: 20,
    // },
    // title: {
    //     fontSize: 16,
    //     marginTop: 3,
    //     fontWeight: 'bold',
    // },
    // caption: {
    //     fontSize: 14,
    //     lineHeight: 14,
    // },
    // row: {
    //     marginTop: 20,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // section: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginRight: 15,
    // },
    // paragraph: {
    //     fontWeight: 'bold',
    //     marginRight: 3,
    // },
    // drawerSection: {
    //     marginTop: 15,
    // },
    // bottomDrawerSection: {
    //     marginBottom: 15,
    //     borderTopColor: colors.primary,
    //     borderTopWidth: 1,
    // },
    // preference: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingVertical: 12,
    //     paddingHorizontal: 16,
    // }
})
