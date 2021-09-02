import { createStackNavigator } from 'react-navigation-stack'
import { RecipesScreen, EditRecipeScreen, ViewRecipeScreen } from '../screens'
import { Header } from '../components/routes'
import * as routeUtils from '../config/routes'

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
    ViewRecipe: {
        screen: ViewRecipeScreen,
        navigationOptions: () => ({
            header: () => null,
        }),
    }
}

const stackConfig: any = {
    detachInactiveScreens: true,
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideAnimationVertical
    },
}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
