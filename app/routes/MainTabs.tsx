import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabsComponent from '../components/routes/Tabs'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'
import { TestScreen } from '../screens'


const Tabs = createBottomTabNavigator()

function MainTabs(): JSX.Element {

    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            screenOptions={{ headerShown: false }}
            tabBar={({ navigation, state, descriptors }) => (
                <TabsComponent
                    navigation={navigation}
                    state={state}
                    descriptors={descriptors}
                />
            )}
        >
            <Tabs.Screen name="BrowseStack" component={BrowseStack} />

            <Tabs.Screen name="RecipesStack" component={RecipesStack} />

            <Tabs.Screen name="Test" component={TestScreen} />
        </Tabs.Navigator>
    )
}

export default MainTabs
