import PushNotification from 'react-native-push-notification';

class Notifications {
    constructor() {
        PushNotification.configure({
            onRegister: function (token) {
                console.log('Token: ', token);
            },
            onNotification: function (notification) {
                console.log('Notification: ', notification);
            },
            popInitialNotification: true,
            requestPermissions: false,
        });

        PushNotification.createChannel(
            {
                channelId: 'pillease',
                channelName: 'Task reminder notifications',
                channelDescription: 'Reminder for any tasks',
            },
            () => {},
        );
        
        PushNotification.getScheduledLocalNotifications(rn => {
            console.log('SN --- ', rn);
        });
    }

    // 이 함수 호출하면 푸시 알림 날아옴.
    scheduleNotification(date) {
        PushNotification.localNotificationSchedule({
            channelId: 'pillease',
            title: '약 종류',
            message: '약 먹을 시간입니다!',
            date,
        })
    }
}

export default new Notifications();