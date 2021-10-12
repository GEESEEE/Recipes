import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditInstructionsScreen from './EditInstructions'
import EditInstructionScreen from './EditInstruction'
import { routeUtils } from '@/config'

const Stack = createStackNavigator()

function EditInstructionsStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="EditInstructions"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: routeUtils.slideVertical,
                headerShown: false
            }}
        >
            <Stack.Screen
                name="EditInstructions"
                component={EditInstructionsScreen}
            />

            <Stack.Screen
                name="EditInstruction"
                component={EditInstructionScreen}
            />
        </Stack.Navigator>
    )
}

export default EditInstructionsStack
