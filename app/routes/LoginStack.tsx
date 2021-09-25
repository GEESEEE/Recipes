import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { routeUtils } from '@/config'
import { LoginScreen, Popup, RegisterScreen } from '@/screens'
import Drawer from './Drawer'

const Stack = createStackNavigator()

function LoginStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                cardStyleInterpolator: routeUtils.slideHorizontal,
            }}
        >

            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Register" component={RegisterScreen} />

            <Stack.Screen
                name="Main"
                component={Drawer}
                options={{
                    presentation: 'transparentModal',
                    cardStyleInterpolator: routeUtils.slideVertical,
                }}
            />

            <Stack.Screen
                name="Popup"
                component={Popup}
                options={{
                    cardStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
                    presentation: 'transparentModal',
                    cardStyleInterpolator: routeUtils.fade,
                }}
            />
        </Stack.Navigator>
    )
}

export default LoginStack
