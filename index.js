/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import BackgroundFetch from "react-native-background-fetch";
import firestore from '@react-native-firebase/firestore';
import Notifications from './Notifications';
import auth from '@react-native-firebase/auth';
import { TimelineList } from 'react-native-calendars';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

const setNotification = () => {
  Notifications.scheduleNotification(new Date(Date.now() + 5 * 1000));
};

AppRegistry.registerComponent(appName, () => App);

function compareDate(date1, date2) {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
    return true;
  else return false;
};

function getTimeLine() {
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
            let current = Date.now();
            for (let i=0; i < time_list.length(); i++) {
              let date = time_list[i];
              if (date.getMinutes() >= current.getMinutes() -15  || date.getMinutes() <= current.getMinutes() + 15) {
                setNotification(Date.now() + 3*1000);
                break;
              }
            }
          });
      });
    } else {
      setLoggedIn(false);
    }
  });
}

let SendNotifications = async(event) => {
  let taskId = event.taskId;
  let isTimeout = event.timeout;
  if (isTimeout) {
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  // 사용자 복용 약 시간 리스트 불러와서 현재 시간과 비교 후 알림 전송
  getTimeLine();
  console.log('알림이 전송되었습니다.');
  BackgroundFetch.finish(taskId);
}

BackgroundFetch.registerHeadlessTask(SendNotifications);
