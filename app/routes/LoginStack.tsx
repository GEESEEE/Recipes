import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RegisterScreen from '../screens/RegisterScreen';

const screens = {
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen, 
  },
  Main: {
    screen: MainScreen,
  },
};

const LoginStack = createStackNavigator(screens, { headerMode: 'none' });

export default createAppContainer(LoginStack);
