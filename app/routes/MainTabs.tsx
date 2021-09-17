import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderComponent, TabsComponent } from '../components/routes'
import BrowseStack from './BrowseStack'
import RecipesStack from './RecipesStack'
import {TestScreen} from '../screens'

const Tabs = createBottomTabNavigator()

function MainTabs(): JSX.Element {
    return (
        <Tabs.Navigator
            initialRouteName="BrowseStack"
            // screenOptions={{
            //     header: ({navigation}) => <HeaderComponent navigation={navigation}/>
            // }}
            tabBar={({navigation }) => <TabsComponent navigation={navigation}/>}
        >

            <Tabs.Screen
                name="BrowseStack"
                component={BrowseStack}
            />

            <Tabs.Screen
                name="RecipesStack"
                component={RecipesStack}
            />

            <Tabs.Screen
                name="Test"
                component={TestScreen}
            />

        </Tabs.Navigator>
    )
}

export default MainTabs
