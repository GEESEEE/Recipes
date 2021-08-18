import { createStackNavigator } from 'react-navigation-stack'
import {RecipesScreen, NewRecipeScreen} from '../screens'
import { Header } from '../components/routes'

const screens = {
    RecipesScreen: {
        screen: RecipesScreen,
        navigationOptions: () => ({
            header: Header,
            headerMode: 'screen',
        }),
    },
    CreateRecipe: {
        screen: NewRecipeScreen,
        navigationOptions: () => ({
            header: () => null,
        }),
    },
}

const stackConfig = {}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
