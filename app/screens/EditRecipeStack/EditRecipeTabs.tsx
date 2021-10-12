import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { EditRecipeScreen, EditIngredientsScreen, EditInstructionsScreen } from '@/screens/EditRecipeStack'
import { TabNavigator, TabNavigatorConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabNavigatorConfig = {
    EditRecipe: {
        name: 'Recipe'
    },
    EditIngredients: {
        name: 'Ingredients'
    },
    EditInstructions: {
        name: 'Instructions'
    }
}

function EditRecipeTabs(): JSX.Element {
    const position = 'top'
    return (
        <Tabs.Navigator
            initialRouteName="EditRecipe"
            tabBar={({ navigation, state }: any) => (
                <TabNavigator navigation={navigation} state={state} config={config} position={position} />
            )}
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
