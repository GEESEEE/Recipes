import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from "react-navigation-drawer"
import { DrawerContent } from '../screens/DrawerContent'
import MainScreen from '../screens/MainScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import RecipesScreen from '../screens/RecipesScreen'

const screens = {
    Drawer: {
        screen: DrawerContent,
    },
    Main: {
        screen: MainScreen,
    },
    NewRecipe: {
        screen: NewRecipeScreen,
    },
    RecipesScreen: {
        screen: RecipesScreen,
    },
}

const drawerOptions = {
}

const Drawer = createDrawerNavigator(screens, drawerOptions)

export default createAppContainer(Drawer)
