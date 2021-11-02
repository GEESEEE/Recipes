import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditIngredientScreen, IngredientsScreen } from '@/screens'

import { screenUtils } from '@/utils'

const Stack = createStackNavigator()

function EditIngredientsStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="EditIngredients"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideVertical,
            }}
        >
            <Stack.Screen
                name="EditIngredients"
                component={IngredientsScreen}
            />

            <Stack.Screen
                name="EditIngredient"
                component={EditIngredientScreen}
            />
        </Stack.Navigator>
    )
}

export default EditIngredientsStack
