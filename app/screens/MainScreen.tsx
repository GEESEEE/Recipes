import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../config/colors';
import LoginScreen from './LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainScreen(): JSX.Element {
  return (
    <View style={styles.background}>
      <Text>main screen</Text>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
