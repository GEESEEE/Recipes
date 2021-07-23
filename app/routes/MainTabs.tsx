import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import RecipeListItem from '../components/RecipeListItemComponent'
import MainScreen from '../screens/MainScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import RecipesScreen from '../screens/RecipesScreen'

const screens = {
    Main: {
        screen: MainScreen,
    },
    NewRecipe: {
        screen: NewRecipeScreen,
    },
    RecipesScreen: {
        screen: RecipesScreen,
    },
}

const tabBarOptions = {}

const MainTabs = createBottomTabNavigator(screens, tabBarOptions)

export default createAppContainer(MainTabs)
