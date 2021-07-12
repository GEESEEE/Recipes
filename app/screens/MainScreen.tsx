import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../config/colors';

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
