import { createStackNavigator } from 'react-navigation-stack'
import { Header } from '../components/routes'
import { MainScreen } from '../screens'
import * as routeUtils from '../config/routes'
import { ViewRecipeConfig } from './config'

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: Header,
            headerMode: 'screen',
        }),
    },
    ...ViewRecipeConfig,
}

const stackConfig: any = {
    detachInactiveScreens: true,
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideVertical,
    },
}

const MainStack = createStackNavigator(screens, stackConfig)

export default MainStack
