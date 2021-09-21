import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabsComponent } from './components'
import { TestScreen } from '@/screens'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'
import { routeUtils } from '@/config'


const Tabs = createBottomTabNavigator()

function MainTabs(): JSX.Element {

    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            screenOptions={{
                headerShown: false,

            }}
            backBehavior="history"
            tabBar={({ navigation, state, descriptors }) => (
                <TabsComponent
                    navigation={navigation}
                    state={state}
                    descriptors={descriptors}
                />
            )}
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
