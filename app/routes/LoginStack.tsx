import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Navigator from '../routes/MainTabs'

const screens = {
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen, 
  },
  Main: {
    screen: Navigator,
  },
};

const LoginStack = createStackNavigator(screens, { headerMode: 'none' });

export default createAppContainer(LoginStack);
