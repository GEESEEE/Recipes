import React from 'react'
import {View, StyleSheet} from 'react-native'
import {} from 'react-navigation-drawer'
import { Text } from 'react-native-paper'
import Drawer from '../routes/Drawer'


export function DrawerContent(props: any): JSX.Element {
    return  (
        <View style={styles.drawerContent} />
    )
}

const styles = StyleSheet.create({
    drawerContent: {
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
