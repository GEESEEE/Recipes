import { createDrawerNavigator } from 'react-navigation-drawer'
import { Drawer } from '../components/routes'
import MainTabs from './main-tabs'
import RecipesStack from './recipes-stack'

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
    contentComponent: Drawer,
}

const DrawerNavigator = createDrawerNavigator(screens, drawerOptions)

export default DrawerNavigator
