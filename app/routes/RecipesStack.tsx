import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import Feather from 'react-native-vector-icons/Feather'
import RecipesScreen from '../screens/RecipesScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import { MainTabsHeader } from '../components/MainTabsHeader'
import colors from '../config/colors'


const screens = {
    RecipesScreen: {
        screen: RecipesScreen,
        navigationOptions: () => ({
            header: MainTabsHeader,
            headerMode: 'screen'
        })

    },
    CreateRecipe: {
        screen: NewRecipeScreen,
        navigationOptions: () => ({
            header: () => null
        })
    }
}

const stackConfig = {

}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
