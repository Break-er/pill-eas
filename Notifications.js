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

        // channelId는 아래와 일치해야 함.
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
    // channelId는 위와 일치해야 함.
    scheduleNotification(date) {
        PushNotification.localNotificationSchedule({
            channelId: 'pillease',
            title: '약 복용 알림',
            message: '약 드실 시간입니다!',
            date,
        })
    }
}

export default new Notifications();