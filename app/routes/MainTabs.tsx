import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TestScreen } from '@/screens'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'
import { TabNavigator, TabNavigatorConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabNavigatorConfig = {
    BrowseStack: {
        icon: 'book-search',
        name: 'Browse',
    },
    RecipesStack: {
        icon: 'book-open-page-variant',
        name: 'My Recipes',
    },
    Test: {
        icon: 'test-tube',
        name: 'Test',
    },
}

function MainTabs(): JSX.Element {
    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            backBehavior="history"
            tabBarPosition="bottom"
            tabBar={({ navigation, state }: any) => (
                <TabNavigator navigation={navigation} state={state} config={config} position='bottom' />
            )}
            screenOptions={{
                swipeEnabled: false,
            }}
        >
            <Tabs.Screen name="BrowseStack" component={BrowseStack} />

            <Tabs.Screen name="RecipesStack" component={RecipesStack} />

            <Tabs.Screen name="Test" component={TestScreen} />
        </Tabs.Navigator>
    )
}

export default MainTabs
