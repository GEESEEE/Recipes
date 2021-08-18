import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Feather from 'react-native-vector-icons/Feather'
import { View } from 'react-native'
import MainStack from './MainStack'
import RecipesStack from './RecipesStack'
import { BottomTab } from '../components/BottomTab'

const screens = {
    Main: {
        screen: MainStack,
        navigationOptions: {
            tabBarLabel: 'Browse',
            tabBarIcon: ({ tintColor }: { tintColor: string }) => (
                <View>
                    <Feather color={tintColor} name="book-open" size={25} />
                </View>
            ),
        },
    },
    RecipesScreen: {
        screen: RecipesStack,
        navigationOptions: {
            tabBarLabel: 'My Recipes',
            tabBarIcon: ({ tintColor }: { tintColor: string }) => (
                <View>
                    <Feather color={tintColor} name="user" size={25} />
                </View>
            ),
        },
    },
}

const tabConfig = {
    initialRouteName: 'Main',
    tabBarComponent: BottomTab
}

const MainTabs = createBottomTabNavigator(screens, tabConfig)

export default MainTabs
