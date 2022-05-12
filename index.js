/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import BackgroundFetch from "react-native-background-fetch";

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);

let SendNotifications = async(event) => {
  let taskId = event.taskId;
  let isTimeout = event.timeout;
  if (isTimeout) {
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  
  // 이 부분에 여기에 알림 전송 코드 추가하면 됩니다.

  console.log('알림이 전송되었습니다.');
  BackgroundFetch.finish(taskId);
}

BackgroundFetch.registerHeadlessTask(SendNotifications);
