import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditRecipeScreen } from '@/screens'
import { screenUtils } from '@/utils'

const Stack = createStackNavigator()

function EditRecipeStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="EditRecipe"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideVertical,
            }}
        >
            <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
        </Stack.Navigator>
    )
}

export default EditRecipeStack
