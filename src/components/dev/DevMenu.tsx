import React, { useState, useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePurchaseStore, useSettingsStore, useHistoryStore } from '../../stores';
import { storage } from '../../utils/storage';
import type { ThemeMode } from '../../types';

interface DevMenuProps {
  children: React.ReactNode;
}

export function DevMenu({ children }: DevMenuProps) {
  const [visible, setVisible] = useState(false);
  const { isPro, unlockPro, lockPro } = usePurchaseStore();
  const { theme, setTheme, notificationsEnabled, setNotificationsEnabled } = useSettingsStore();
  const { items, clearHistory } = useHistoryStore();

  const toggleMenu = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleClearStorage = () => {
    Alert.alert(
      'Clear Storage',
      'This will clear all AsyncStorage data.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await storage.clear();
            lockPro();
            clearHistory();
            setTheme('system');
            setNotificationsEnabled(true);
            Alert.alert('Done', 'Storage cleared');
          },
        },
      ]
    );
  };

  const handleSimulatePurchase = () => {
    if (isPro) {
      lockPro();
      Alert.alert('Done', 'Purchase status: Free');
    } else {
      unlockPro();
      Alert.alert('Done', 'Purchase status: Pro');
    }
    setVisible(false);
  };

  const handleSimulateNotification = () => {
    Alert.alert('Notification', 'Simulated notification sent!');
    setVisible(false);
  };

  const handleToggleTheme = () => {
    const themes: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    setVisible(false);
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    setVisible(false);
  };

  return (
    <>
      {children}
      {__DEV__ && (
        <TouchableOpacity style={styles.devButton} onPress={toggleMenu}>
          <Text style={styles.devButtonText}>DEV</Text>
        </TouchableOpacity>
      )}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Development Menu</Text>
            <Text style={styles.subtitle}>Expo Starter Kit v1.0.0</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Status</Text>
              <View style={styles.row}>
                <Text>Theme:</Text>
                <Text style={styles.value}>{theme}</Text>
              </View>
              <View style={styles.row}>
                <Text>Notifications:</Text>
                <Text style={styles.value}>{notificationsEnabled ? 'ON' : 'OFF'}</Text>
              </View>
              <View style={styles.row}>
                <Text>Purchase:</Text>
                <Text style={styles.value}>{isPro ? 'Pro' : 'Free'}</Text>
              </View>
              <View style={styles.row}>
                <Text>History Items:</Text>
                <Text style={styles.value}>{items.length}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSimulatePurchase}>
              <Text style={styles.buttonText}>{isPro ? 'Simulate Free User' : 'Simulate Pro Purchase'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSimulateNotification}>
              <Text style={styles.buttonText}>Send Test Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleToggleTheme}>
              <Text style={styles.buttonText}>Toggle Theme ({theme})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleToggleNotifications}>
              <Text style={styles.buttonText}>Toggle Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleClearStorage}>
              <Text style={styles.dangerButtonText}>Clear All Storage</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  devButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 999,
  },
  devButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  value: {
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 8,
    padding: 14,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
