import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RecipesStack from './RecipesStack'
import BrowseStack from './BrowseStack'
import { TestScreen, PaymentScreen } from '@/screens'
import { TabComponent, TabConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabConfig = {
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
    Payment: {
        icon: 'menu',
        name: 'Payment',
    },
}

function MainTabs(): JSX.Element {
    const position = 'bottom'

    return (
        <Tabs.Navigator
            initialRouteName="RecipesStack"
            backBehavior="history"
            tabBarPosition={position}
            tabBar={({ navigation, state }: any) => (
                <TabComponent
                    navigation={navigation}
                    state={state}
                    config={config}
                    position={position}
                />
            )}
            screenOptions={{
                swipeEnabled: false,
            }}
        >
            <Tabs.Screen name="RecipesStack" component={RecipesStack} />

            <Tabs.Screen name="BrowseStack" component={BrowseStack} />

            <Tabs.Screen name="Test" component={TestScreen} />

            <Tabs.Screen name="Payment" component={PaymentScreen} />
        </Tabs.Navigator>
    )
}

export default MainTabs
