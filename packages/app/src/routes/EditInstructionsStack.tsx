import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InstructionsScreen, EditInstructionScreen } from '@/screens'

import { screenUtils } from '@/utils'

const Stack = createStackNavigator()

function EditInstructionsStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="EditInstructions"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideVertical,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="EditInstructions"
                component={InstructionsScreen}
            />

            <Stack.Screen
                name="EditInstruction"
                component={EditInstructionScreen}
            />
        </Stack.Navigator>
    )
}

export default EditInstructionsStack
