import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainTabs from './MainTabs'
import { DrawerComponent } from '@/components/molecules'

const DrawerNav = createDrawerNavigator()

function Drawer(): JSX.Element {
    return (
        <DrawerNav.Navigator
            initialRouteName="MainTabs"
            screenOptions={{ headerShown: false }}
            drawerContent={({ navigation }) => (
                <DrawerComponent navigation={navigation} />
            )}
        >
            <DrawerNav.Screen name="MainTabs" component={MainTabs} />
        </DrawerNav.Navigator>
    )
}

export default Drawer
