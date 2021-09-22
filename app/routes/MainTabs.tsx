import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TabsComponent } from './components'
import { TestScreen } from '@/screens'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'

const Tabs = createMaterialTopTabNavigator()

function MainTabs(): JSX.Element {

    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            backBehavior="history"
            tabBarPosition="bottom"
            tabBar={({ navigation, state }: any) => (
                <TabsComponent
                    navigation={navigation}
                    state={state}
                />
            )}
            screenOptions={{
                swipeEnabled: false
            }}

        >
            <Tabs.Screen
                name="BrowseStack"
                component={BrowseStack}
            />

            <Tabs.Screen name="RecipesStack" component={RecipesStack} />

            <Tabs.Screen name="Test" component={TestScreen} />
        </Tabs.Navigator>
    )
}

export default MainTabs
