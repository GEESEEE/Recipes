import { createStackNavigator } from 'react-navigation-stack'
import RecipesScreen from '../screens/RecipesScreen'
import NewRecipeScreen from '../screens/NewRecipeScreen'
import { MainTabsHeader } from '../components/MainTabsHeader'


const screens = {
    RecipesScreen: {
        screen: RecipesScreen,
        navigationOptions: () => ({
            header: MainTabsHeader,
            headerMode: 'screen'
        })

    },
    CreateRecipe: {
        screen: NewRecipeScreen,
        navigationOptions: () => ({
            header: () => null
        })
    }
}

const stackConfig = {

}

const RecipesStack = createStackNavigator(screens, stackConfig)

export default RecipesStack
