import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import Feather from "react-native-vector-icons/Feather"
import { View } from 'react-native'
import colors from '../config/colors'
import MainScreen from '../screens/MainScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import RecipesScreen from '../screens/RecipesScreen'

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: {
            tabBarLabel: 'Browse',
            tabBarIcon: ({tintColor} : {tintColor: any}) => (
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
            tabBarIcon: ({tintColor} : {tintColor: any}) => (
                <View>
                    <Feather color={tintColor} name="user" size={25}/>
                </View>
            )
        }
    },
}

const tabBarOptions = {
    initialRouteName: 'Main',
    barStyle: { backgroundColor: colors.primary},
    activeColor: colors.lightgrey,
    inactiveColor: colors.grey,
    shifting: true
}

const MainTabs = createMaterialBottomTabNavigator(screens, tabBarOptions)

export default createAppContainer(MainTabs)
