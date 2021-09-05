import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { LoginScreen, RegisterScreen, Popup } from '../screens'
import Drawer from './Drawer'
import * as routeUtils from '../config/routes'

const screens = {
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    Main: {
        screen: Drawer,
    },
    Popup: {
        screen: Popup,
        navigationOptions: {
            cardStyle: { backgroundColor: 'rgba(0,0,0,0.25)' },
            cardStyleInterpolator: () => ({
                cardStyle: {}
            }),
        }
    }
}

const stackConfig: any = {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideAnimationHorizontal,
    },
}

const LoginStack = createStackNavigator(screens, stackConfig)

export default createAppContainer(LoginStack)
