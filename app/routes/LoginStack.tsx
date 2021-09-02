import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { LoginScreen, RegisterScreen } from '../screens'
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
}

const stackConfig: any = {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: routeUtils.slideAnimation
    },

}

const LoginStack = createStackNavigator(screens, stackConfig)

export default createAppContainer(LoginStack)
