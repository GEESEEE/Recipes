import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { TabsComponent } from '../components/routes'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'

const Tabs = createBottomTabNavigator()

function MainTabs(): JSX.Element {
    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            // tabBar={({navigation }) => <BottomTab navigation={navigation}/>}
        >

            <Tabs.Screen
                name="BrowseStack"
                component={BrowseStack}
            />

            <Tabs.Screen
                name="RecipesStack"
                component={RecipesStack}
            />

        </Tabs.Navigator>
    )
}

export default MainTabs
