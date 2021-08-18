import { createStackNavigator } from 'react-navigation-stack'
import { Header } from '../components/routes'
import {MainScreen} from '../screens'

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: Header,
            headerMode: 'screen',
        }),
    },
}

const stackConfig = {}

const MainStack = createStackNavigator(screens, stackConfig)

export default MainStack
