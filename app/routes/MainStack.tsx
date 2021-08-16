import { createStackNavigator } from 'react-navigation-stack'
import { MainTabsHeader } from '../components/MainTabsHeader'
import MainScreen from '../screens/MainScreen'

const screens = {
    Main: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: MainTabsHeader,
            headerMode: 'screen'
        })
    }
}

const stackConfig = {

}

const MainStack = createStackNavigator(screens, stackConfig)

export default MainStack
