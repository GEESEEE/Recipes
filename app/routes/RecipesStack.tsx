import { createStackNavigator } from 'react-navigation-stack'
import { RecipesScreen, EditRecipeScreen } from '../screens'
import { Header } from '../components/routes'
import * as routeUtils from '../config/routes'
import { ViewRecipeConfig } from './config'

const screens = {
    Recipes: {
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
    ...ViewRecipeConfig,
}

const stackConfig: any = {
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideVertical,
    },
}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
