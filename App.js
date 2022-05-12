/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Header from './src/components/Header/Header';
import MainScreen from './src/screens/Main/Main';
import AddMedicine from './src/screens/AddMedicine/AddMedicine';
import EditMedicine from './src/screens/EditMedicine/EditMedicine';
import LoginScreen from './src/screens/Login/Login';
import SplashScreen from 'react-native-splash-screen';
import InformationScreen from './src/screens/Information/Information';
import BottomNav from './src/components/BottomNav/BottomNav';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackgroundFetch from 'react-native-background-fetch';

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

  const initBackgroundFetch = async () => {
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false,
      },
      async taskId => {
        console.log('[BackgroundFetch] task:', taskId);
      },
      async taskId => {
        console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
        BackgroundFetch.finish(taskId);
      },
    );

    console.log('status:', status);

    // BackgroundFetch.scheduleTask({
    //   taskId: 'test',
    //   delay: 0,
    //   forceAlarmManager: true,
    //   periodic: true
    // });
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
    initBackgroundFetch();
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#85DEDC',
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#85DEDC',
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="AddMedicine"
            component={AddMedicine}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="EditMedicine"
            component={EditMedicine}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Info"
            component={InformationScreen}
            options={{
              headerTitle: '',
              headerRight: () => <Header />,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
