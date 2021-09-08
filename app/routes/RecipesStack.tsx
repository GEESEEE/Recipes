import { createStackNavigator } from 'react-navigation-stack'
import { RecipesScreen, EditRecipeScreen, ViewRecipeConfig } from '../screens'
import { Header } from '../components/routes'
import * as routeUtils from '../config/routes'

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
    ...ViewRecipeConfig
}

const stackConfig: any = {
    detachInactiveScreens: true,
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideVertical,
    },
}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
