import React from 'react'

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import Feather from "react-native-vector-icons/Feather"
import { View } from 'react-native'
import colors from '../config/colors'
import MainStack from './MainStack'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import RecipesScreen from '../screens/RecipesScreen'
import MainScreen from '../screens/MainScreen'
import RecipesStack from './RecipesStack'


const DrawerButton = (): JSX.Element => (
        <Feather name="menu"
                size={30}
                />
    )

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: {
            tabBarLabel: 'Browse',
            tabBarIcon: ({tintColor} : {tintColor: string}) => (
                <View>
                    <Feather color={tintColor} name="book-open" size={25}/>
                </View>
            )
        }
    },
    NewRecipe: {
        screen: NewRecipeScreen,
        navigationOptions: {
            tabBarLabel: 'Create New Recipe',
            tabBarIcon: ({tintColor} : {tintColor: any}) => (
                <View>
                    <Feather color={tintColor} name="book" size={25}/>
                </View>
            )
        }
    },
    RecipesScreen: {
        screen: RecipesScreen,
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
    activeColor: colors.lightgrey,
    inactiveColor: colors.grey,
    shifting: false,
}

const MainTabs = createMaterialBottomTabNavigator(screens, tabConfig)

export default MainTabs
