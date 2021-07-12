import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainScreen from '../screens/MainScreen';

const screens = {
  Main: {
    screen: MainScreen,
  },
};

const tabBarOptions = {

};

const MainTabs = createBottomTabNavigator(screens, tabBarOptions);

export default createAppContainer(MainTabs);
