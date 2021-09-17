import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditRecipeScreen, RecipesScreen, ViewRecipeScreen } from '../screens'
import { HeaderComponent } from '../components/routes'

const Stack = createStackNavigator()

function RecipesStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Recipes"
        >

            <Stack.Screen
                name="Recipes"
                component={RecipesScreen}
                options={{
                    header: ({navigation}) =>
                        <HeaderComponent
                            navigation={navigation}
                        />
                }}
            />

            <Stack.Screen
                name="EditRecipe"
                component={EditRecipeScreen}
            />

            <Stack.Screen
                name="ViewRecipe"
                component={ViewRecipeScreen}
            />
        </Stack.Navigator>
    )
}

export default RecipesStack
