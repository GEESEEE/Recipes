import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { EditRecipeScreen } from '@/screens/EditRecipeStack'
import { EditInstructionsStack } from './EditInstructionsStack'
import { EditIngredientsStack } from './EditIngredientsStack'
import { TabNavigator, TabNavigatorConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabNavigatorConfig = {
    EditRecipe: {
        name: 'Recipe'
    },
    EditIngredientsStack: {
        name: 'Ingredients'
    },
    EditInstructionsStack: {
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
                name='EditIngredientsStack'
                component={EditIngredientsStack}
            />

            <Tabs.Screen
                name='EditInstructionsStack'
                component={EditInstructionsStack}
            />

        </Tabs.Navigator>
    )
}

export default EditRecipeTabs
