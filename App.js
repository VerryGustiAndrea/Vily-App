import React from 'react';
// import MainNavigators from './src/public/navigators/MainNavigators';
import Maps from './src/screens/Maps';
// import {Provider} from 'react-redux'
// import store from './src/redux'
// console.disableYellowBox = true;
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Maps';
import LogoutModals from './src/screens/modals/Logout';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({Login: LoginScreen});
const HomeStack = createStackNavigator(
  {Home: HomeScreen, Auth: AuthStack},
  {headerMode: 'none'},
);
const LogoutStack = createStackNavigator({Profile: LogoutModals});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Home: HomeStack,
      Logout: LogoutStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
