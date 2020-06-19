import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export function scheduleDailyNotification() {
  getiOSNotificationPermission();

  // Cancel the next notification to prevent having 2 alerts
  Notifications.cancelAllScheduledNotificationsAsync();

  const nextDay = Date.now() + 3600000 * 24;

  Notifications.scheduleLocalNotificationAsync(
    {
      title: 'Hi from Mobile Flashcards!',
      body: "Don't forget to study today :)",
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    },
    { time: nextDay }
  );
}
