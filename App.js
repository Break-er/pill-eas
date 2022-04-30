/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Text, View} from 'react-native';
import Home from './src/screens/Home/Home';
import SplashScreen from 'react-native-splash-screen';
import BottomNav from './src/components/BottomNav/BottomNav';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#85DEDC',
    accent: '#8AB5E6',
  },
};

const App = () => {
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
      <BottomNav />
    </PaperProvider>
  );
};

export default App;
