import { createDrawerNavigator } from 'react-navigation-drawer'
import { DrawerComponent } from '../components/routes'
import MainTabs from './MainTabs'
import RecipesStack from './RecipesStack'

const screens = {
    Main: {
        screen: MainTabs,
    },
    Recipes: {
        screen: RecipesStack,
    },
}

const drawerOptions = {
    drawerWidth: 200,
    contentComponent: DrawerComponent,
}

const DrawerNavigator = createDrawerNavigator(screens, drawerOptions)

export default DrawerNavigator
