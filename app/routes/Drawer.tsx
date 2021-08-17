import { createDrawerNavigator } from 'react-navigation-drawer'
import { DrawerContent } from '../screens/DrawerContent'
import MainTabs from './MainTabs'
import RecipesStack from './RecipesStack'

const screens = {
    Main: {
        screen: MainTabs,
    },
    RecipesScreen: {
        screen: RecipesStack,
    },
}

const drawerOptions = {
    drawerWidth: 200,
    contentComponent: DrawerContent,
}

const DrawerNavigator = createDrawerNavigator(screens, drawerOptions)

export default DrawerNavigator
