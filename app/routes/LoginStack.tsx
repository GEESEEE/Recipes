import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Drawer from './Drawer'

const screens = {
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    Main: {
        screen: Drawer
    }
}

const stackConfig: any = {
    headerMode: 'none',
}

const LoginStack = createStackNavigator(screens, stackConfig)

export default createAppContainer(LoginStack)
