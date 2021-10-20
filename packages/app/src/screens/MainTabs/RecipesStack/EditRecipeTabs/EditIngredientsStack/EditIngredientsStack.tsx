import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditIngredientsScreen from './EditIngredients'
import EditIngredientScreen from './EditIngredient'
import { screenUtils } from '@/utils'

const Stack = createStackNavigator()

function EditIngredientsStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="EditIngredients"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideVertical,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="EditIngredients"
                component={EditIngredientsScreen}
            />

            <Stack.Screen
                name="EditIngredient"
                component={EditIngredientScreen}
            />
        </Stack.Navigator>
    )
}

export default EditIngredientsStack
