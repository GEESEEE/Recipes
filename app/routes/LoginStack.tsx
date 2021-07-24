import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Navigator from './MainTabs'

const screens = {
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
}

const LoginStack = createStackNavigator(screens, { headerMode: 'none' })

export default LoginStack
