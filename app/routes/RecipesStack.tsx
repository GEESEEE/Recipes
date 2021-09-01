import { createStackNavigator } from 'react-navigation-stack'
import { RecipesScreen, EditRecipeScreen, ShowRecipeScreen } from '../screens'
import { Header } from '../components/routes'

const screens = {
    RecipesScreen: {
        screen: RecipesScreen,
        navigationOptions: () => ({
            header: Header,
            headerMode: 'screen',
        }),
    },
    EditRecipe: {
        screen: EditRecipeScreen,
        navigationOptions: () => ({
            header: () => null,
        }),
    },
    ShowRecipe: {
        screen: ShowRecipeScreen,
        navigationOptions: () => ({
            header: () => null,
        }),
    }
}

const stackConfig = {}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
