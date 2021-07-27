import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/MainScreen'

const screens = {
    Main: {
        screen: MainScreen,
    }
}

const stackConfig = {

}

const MainStack = createStackNavigator(screens, stackConfig)

export default MainStack
