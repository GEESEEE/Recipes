import React from 'react'

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import Feather from "react-native-vector-icons/Feather"
import { View } from 'react-native'
import colors from '../config/colors'
import MainStack from './MainStack'
import RecipesStack from './RecipesStack'


const screens = {
    Main: {
        screen: MainStack,
        navigationOptions: {
            tabBarLabel: 'Browse',
            tabBarIcon: ({tintColor} : {tintColor: string}) => (
                <View>
                    <Feather color={tintColor} name="book-open" size={25}/>
                </View>
            ),

        }
    },
    RecipesScreen: {
        screen: RecipesStack,
        navigationOptions: {
            tabBarLabel: 'My Recipes',
            tabBarIcon: ({tintColor} : {tintColor: string}) => (
                <View>
                    <Feather color={tintColor} name="user" size={25}/>
                </View>
            )
        }
    },
}

const tabConfig = {
    initialRouteName: 'Main',
    barStyle: { backgroundColor: colors.primary},
    activeColor: colors.white,
    inactiveColor: colors.lightgrey,
    shifting: true,
}

const MainTabs = createMaterialBottomTabNavigator(screens, tabConfig)

export default MainTabs
