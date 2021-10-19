import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EditRecipeScreen from './EditRecipe'
import { EditInstructionsStack } from './EditInstructionsStack'
import { EditIngredientsStack } from './EditIngredientsStack'
import { TabComponent, TabConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabConfig = {
    EditRecipe: {
        name: 'Recipe',
    },
    EditIngredientsStack: {
        name: 'Ingredients',
    },
    EditInstructionsStack: {
        name: 'Instructions',
    },
}

function EditRecipeTabs(): JSX.Element {
    const position = 'top'
    return (
        <Tabs.Navigator
            initialRouteName="EditRecipe"
            tabBar={({ navigation, state }: any) => (
                <TabComponent
                    navigation={navigation}
                    state={state}
                    config={config}
                    position={position}
                />
            )}
            screenOptions={{
                swipeEnabled: false,
            }}
        >
            <Tabs.Screen name="EditRecipe" component={EditRecipeScreen} />

            <Tabs.Screen
                name="EditIngredientsStack"
                component={EditIngredientsStack}
            />

            <Tabs.Screen
                name="EditInstructionsStack"
                component={EditInstructionsStack}
            />
        </Tabs.Navigator>
    )
}

export default EditRecipeTabs
