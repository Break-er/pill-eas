/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {View} from 'react-native';
import MainScreen from './src/screens/Main/Main';
import SettingsScreen from './src/screens/Settings/Settings';
import LoginScreen from './src/screens/Login/Login';
import SplashScreen from 'react-native-splash-screen';
import BottomNav from './src/components/BottomNav/BottomNav';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#85DEDC',
    accent: '#8AB5E6',
  },
};

const navTheme = {
  dark: false,
  colors: {
    primary: '#85DEDC',
    // background: 'rgb(242, 242, 242)',
    background: '#ffffff',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="BottomNav">
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
