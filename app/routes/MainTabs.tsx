import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MainScreen from '../screens/MainScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'

const screens = {
    Main: {
        screen: MainScreen,
    },
    NewRecipe: {
        screen: NewRecipeScreen
    }
}

const tabBarOptions = {}

const MainTabs = createBottomTabNavigator(screens, tabBarOptions)

export default createAppContainer(MainTabs)
