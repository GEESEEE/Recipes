import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditRecipeScreen, RecipesScreen, ViewRecipeScreen } from '../screens'

const Stack = createStackNavigator()

function RecipesStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Recipes"
        >

            <Stack.Screen
                name="Recipes"
                component={RecipesScreen}
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
