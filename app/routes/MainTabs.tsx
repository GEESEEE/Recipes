import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Feather from 'react-native-vector-icons/Feather'
import { View } from 'react-native'
import MainStack from './MainStack'
import RecipesStack from './RecipesStack'
import { TestScreen } from '../screens'
import { BottomTab } from '../components/routes'
import * as routeUtils from '../config/routes'

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
    Test: {
        screen: TestScreen,
    },
}

const tabConfig: any = {
    initialRouteName: 'Main',
    tabBarComponent: BottomTab,
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideAnimation
    },
}

const MainTabs = createBottomTabNavigator(screens, tabConfig)

export default MainTabs
