import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HeaderComponent from '../components/routes/Header'
import TabsComponent from '../components/routes/Tabs'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'
import { TestScreen } from '../screens'
import { useAppSelector } from '../hooks'

const Tabs = createBottomTabNavigator()

function MainTabs(): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    // TODO: Use theme to use materialbottomtabs navigator, instead of using my own
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
