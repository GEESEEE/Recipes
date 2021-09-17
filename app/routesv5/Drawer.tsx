import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerComponent } from '../components/routes'
import MainTabs from './MainTabs'

const DrawerNav = createDrawerNavigator()

function Drawer(): JSX.Element {
    return (
        <DrawerNav.Navigator
            initialRouteName="MainTabs"
            drawerContent={({navigation}) => <DrawerComponent navigation={navigation}/>}
        >
            <DrawerNav.Screen
                name="MainTabs"
                component={MainTabs}
            />

        </DrawerNav.Navigator>
    )
}

export default Drawer
