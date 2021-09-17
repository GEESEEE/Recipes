import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Drawer from './Drawer'
import { LoginScreen, Popup, RegisterScreen } from '../screens'

const Stack = createStackNavigator();

function LoginStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
    }}
    >

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Main"
        component={Drawer}
      />

      <Stack.Screen
        name="Popup"
        component={Popup}
      />

    </Stack.Navigator>
  );
}

export default LoginStack;
