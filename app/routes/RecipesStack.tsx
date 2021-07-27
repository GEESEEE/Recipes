import { createStackNavigator } from 'react-navigation-stack'
import RecipesScreen from '../screens/RecipesScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'

const screens = {
    RecipesScreen: {
        screen: RecipesScreen,
    },
    CreateRecipe: {
        screen: NewRecipeScreen
    }
}

const stackConfig = {

}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
