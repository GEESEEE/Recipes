import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from "react-navigation-drawer"
import RecipesScreen from '../screens/RecipesScreen'
import LoginStack from './LoginStack'
import MainTabs from './MainTabs'

const screens = {
    Login: {
        screen: LoginStack,
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    },
    Main: {
        screen: MainTabs,
    },
    RecipesScreen: {
        screen: RecipesScreen,
    },

}

const drawerOptions = {
}

const DrawerNavigator = createDrawerNavigator(screens, drawerOptions)

export default createAppContainer(DrawerNavigator)
