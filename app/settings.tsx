import React from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Spacer } from '../src/components';
import { useSettingsStore, usePurchaseStore, useHistoryStore } from '../src/stores';
import type { ThemeMode } from '../src/types';

const THEME_OPTIONS: { label: string; value: ThemeMode }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

export default function SettingsScreen() {
  const { notificationsEnabled, theme, setNotificationsEnabled, setTheme, resetSettings } = useSettingsStore();
  const { isPro, purchaseDate, lockPro } = usePurchaseStore();
  const { clearHistory } = useHistoryStore();

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all settings, purchase status, and history. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetSettings();
            lockPro();
            clearHistory();
          },
        },
      ]
    );
  };

  const handlePurchase = () => {
    Alert.alert(
      'Purchase',
      'This is a demo. In production, integrate with RevenueCat or react-native-iap.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView contentContainerClassName="p-4">
        <Card>
          <Text className="text-lg font-semibold text-gray-900">Purchase Status</Text>
          <Spacer size="sm" />
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-base text-gray-900">Premium Access</Text>
            <Text className={`text-sm font-medium px-3 py-1 rounded-full ${isPro ? 'bg-success text-white' : 'bg-gray-400 text-white'}`}>
              {isPro ? 'Unlocked' : 'Locked'}
            </Text>
          </View>
          {isPro && purchaseDate && (
            <Text className="text-sm text-gray-500 mt-1">Purchased on {new Date(purchaseDate).toLocaleDateString()}</Text>
          )}
          <Spacer size="md" />
          {!isPro && <Button title="Unlock Premium" onPress={handlePurchase} fullWidth />}
        </Card>

        <Spacer size="lg" />

        <Card>
          <Text className="text-lg font-semibold text-gray-900">Notifications</Text>
          <Spacer size="sm" />
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-base text-gray-900">Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#C6C6C8', true: '#007AFF' }}
            />
          </View>
        </Card>

        <Spacer size="lg" />

        <Card>
          <Text className="text-lg font-semibold text-gray-900">Appearance</Text>
          <Spacer size="sm" />
          <View className="flex-row gap-2">
            {THEME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                title={option.label}
                variant={theme === option.value ? 'primary' : 'outline'}
                size="small"
                onPress={() => setTheme(option.value)}
                className="flex-1"
              />
            ))}
          </View>
        </Card>

        <Spacer size="lg" />

        <Card>
          <Text className="text-lg font-semibold text-gray-900">Data</Text>
          <Spacer size="md" />
          <Button title="Clear History" variant="outline" onPress={handleClearHistory} fullWidth />
          <Spacer size="sm" />
          <Button title="Reset All Data" variant="danger" onPress={handleResetAll} fullWidth />
        </Card>

        <Spacer size="xl" />

        <Text className="text-sm text-gray-500 text-center">Expo Starter Kit v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
