/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Header from './src/components/Header/Header';
import MainScreen from './src/screens/Main/Main';
import AddMedicine from './src/screens/AddMedicine/AddMedicine';
import EditMedicine from './src/screens/EditMedicine/EditMedicine';
import LoginScreen from './src/screens/Login/Login';
import SplashScreen from 'react-native-splash-screen';
import BottomNav from './src/components/BottomNav/BottomNav';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackgroundFetch from 'react-native-background-fetch';
import Notifications from './Notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  const [loggedIn, setLoggedIn] = useState(false);
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
        BackgroundFetch.finish(taskId);
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

  // 이 함수가 실행되면 푸시 알림 날아옴
  const setNotification = () => {
    Notifications.scheduleNotification(new Date(Date.now() + 5 * 1000));
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

  const compareDate = (date1, date2) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
      return true;
    else return false;
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        let tmp = [];
        let time_list = [];

        auth().onAuthStateChanged(user => {
          firestore()
            .collection('Users')
            .doc(user.uid)
            .collection('pillList')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                tmp.push(documentSnapshot.data());
              });
            })
            .then(() => {
              for (let i = 0; i < tmp.length; i++) {
                let start = new Date(tmp[i].startDate.seconds * 1000);
                let end = new Date(tmp[i].endDate.seconds * 1000);
                end.setDate(end.getDate());
                let cycle = tmp[i].cycle;
                let curr = start;

                while (curr <= end) {
                  if (compareDate(curr, new Date())) {
                    for (let j = 0; j < tmp[i].periods.length; j++) {
                      let tmp_date = new Date(curr);
                      let year = tmp_date.getFullYear();
                      let month = tmp_date.getMonth();
                      let date = tmp_date.getDate();
                      let time = new Date(tmp[i].periods[j].seconds * 1000);
                      let hour = time.getHours() + 9;
                      let minutes = time.getMinutes();
                      time_list.push(
                        new Date(year, month, date, hour, minutes, 0),
                      );
                    }
                  }
                  curr.setDate(curr.getDate() + cycle);
                }
              }
            })
            .then(() => {
              console.log(time_list);
              // 현재시간이랑 time_list에 있는 시간이랑 같으면 알람 보내기
            });
        });
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
