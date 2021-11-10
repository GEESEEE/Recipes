import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Drawer from './Drawer'
import EditRecipeTabs from './EditRecipeTabs'
import { PopupScreen } from '@/screens'
import { screenUtils } from '@/utils'

const Stack = createStackNavigator()

function LoginStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideHorizontal,
            }}
        >
            <Stack.Screen
                name="Main"
                component={Drawer}
                options={{
                    presentation: 'transparentModal',
                    cardStyleInterpolator: screenUtils.slideVertical,
                }}
            />

            <Stack.Screen name="EditRecipeTabs" component={EditRecipeTabs} />

            <Stack.Screen
                name="Popup"
                component={PopupScreen}
                options={{
                    cardStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
                    presentation: 'transparentModal',
                    cardStyleInterpolator: screenUtils.fade,
                }}
            />
        </Stack.Navigator>
    )
}

export default LoginStack
