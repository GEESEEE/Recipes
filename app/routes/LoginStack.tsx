import React from 'react'
import { Animated, View } from 'react-native'
import styled from 'styled-components'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { LoginScreen, RegisterScreen } from '../screens'
import Drawer from './Drawer'

const screens = {
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    Main: {
        screen: Drawer,
    },
}

const forSlide = ({ current, next, inverted, layouts: { screen } }): any => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.width * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  };

const stackConfig: any = {
    headerMode: 'none',
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: forSlide
    },

}

const LoginStack = createStackNavigator(screens, stackConfig)

export default createAppContainer(LoginStack)
