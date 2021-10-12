import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { EditRecipeScreen, EditIngredientsScreen, EditInstructionsScreen } from '@/screens/EditRecipeStack'

const Tabs = createMaterialTopTabNavigator()

function EditRecipeTabs(): JSX.Element {
    return (
        <Tabs.Navigator
            initialRouteName="EditRecipe"
        >
            <Tabs.Screen
                name='EditRecipe'
                component={EditRecipeScreen}
            />

            <Tabs.Screen
                name='EditIngredients'
                component={EditIngredientsScreen}
            />

            <Tabs.Screen
                name='EditInstructions'
                component={EditInstructionsScreen}
            />

        </Tabs.Navigator>
    )
}

export default EditRecipeTabs
