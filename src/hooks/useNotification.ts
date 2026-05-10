import { useCallback } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useSettingsStore } from '../stores';

export function useNotification() {
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled);

  const requestPermissions = useCallback(async () => {
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
    (durationSeconds: number, timerId: string) => {
      if (!notificationsEnabled) return;

      const reminders = [
        { seconds: durationSeconds - 15 * 60, title: '还剩15分钟', body: '停车还剩15分钟' },
        { seconds: durationSeconds - 5 * 60, title: '还剩5分钟', body: '停车还剩5分钟' },
        { seconds: 0, title: '超时啦！', body: '停车已超时，快去挪车' },
      ];

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
    },
    [notificationsEnabled]
  );

  const cancelReminder = useCallback(async (timerId: string) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  const sendImmediateNotification = useCallback(
    async (title: string, body: string) => {
      if (!notificationsEnabled) return;
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
  };
}
