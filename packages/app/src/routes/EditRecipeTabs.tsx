import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
    EditInstructionsStack,
    EditIngredientsStack,
    EditRecipeStack,
} from './edit'
import { TabComponent, TabConfig } from '@/components/molecules'

const Tabs = createMaterialTopTabNavigator()

const config: TabConfig = {
    EditRecipeStack: {
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
    const position = 'bottom'
    return (
        <Tabs.Navigator
            initialRouteName="EditRecipeStack"
            tabBarPosition={position}
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
            <Tabs.Screen name="EditRecipeStack" component={EditRecipeStack} />

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
