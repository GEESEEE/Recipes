import { createStackNavigator } from 'react-navigation-stack'
import { Header } from '../components/routes'
import { MainScreen, ViewRecipeConfig } from '../screens'

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: Header,
            headerMode: 'none',
        }),
    },
    ...ViewRecipeConfig
}

const stackConfig = {}

const MainStack = createStackNavigator(screens, stackConfig)

export default MainStack
