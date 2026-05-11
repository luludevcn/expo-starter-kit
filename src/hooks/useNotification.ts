import { useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useSettingsStore } from '../stores';

const isExpoGo = Constants.appOwnership === 'expo';

export function useNotification() {
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled);

  const requestPermissions = useCallback(async () => {
    if (isExpoGo) {
      console.warn('Using simulated local notifications in Expo Go');
      return true;
    }

    const Notifications = await import('expo-notifications');
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return false;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Reminders',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    return true;
  }, []);

  const scheduleTimerReminder = useCallback(
    async (durationSeconds: number, timerId: string) => {
      if (!notificationsEnabled) return;

      const reminders = [
        { seconds: durationSeconds - 15 * 60, title: '还剩15分钟', body: '停车还剩15分钟' },
        { seconds: durationSeconds - 5 * 60, title: '还剩5分钟', body: '停车还剩5分钟' },
        { seconds: 0, title: '超时啦！', body: '停车已超时，快去挪车' },
      ];

      if (isExpoGo) {
        reminders.forEach((rem) => {
          if (rem.seconds >= 0) {
            setTimeout(() => {
              Alert.alert(rem.title, rem.body);
            }, rem.seconds * 1000);
          }
        });
      } else {
        const Notifications = await import('expo-notifications');
        reminders.forEach((rem) => {
          if (rem.seconds >= 0) {
            Notifications.scheduleNotificationAsync({
              identifier: `${timerId}-${rem.seconds}`,
              content: { title: rem.title, body: rem.body },
              trigger: {
                seconds: rem.seconds,
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              },
            });
          }
        });
      }
    },
    [notificationsEnabled]
  );

  const cancelReminder = useCallback(async (timerId: string) => {
    if (!isExpoGo) {
      const Notifications = await import('expo-notifications');
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, []);

  const sendImmediateNotification = useCallback(
    async (title: string, body: string) => {
      if (!notificationsEnabled) return;

      if (isExpoGo) {
        Alert.alert(title, body);
      } else {
        const Notifications = await import('expo-notifications');
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
          });
        }
        await Notifications.scheduleNotificationAsync({
          content: { title, body },
          trigger: null,
        });
      }
    },
    [notificationsEnabled]
  );

  return {
    requestPermissions,
    scheduleTimerReminder,
    cancelReminder,
    sendImmediateNotification,
    notificationsEnabled,
    sendNotification: sendImmediateNotification,
    isExpoGo,
  };
}
