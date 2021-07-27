import { createDrawerNavigator } from "react-navigation-drawer"
import { DrawerContent } from '../screens/DrawerContent'
import RecipesScreen from "../screens/RecipesScreen"
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
    contentComponent: DrawerContent,
}

const DrawerNavigator = createDrawerNavigator(screens, drawerOptions)

export default DrawerNavigator
