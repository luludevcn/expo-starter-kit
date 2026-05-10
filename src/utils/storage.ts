import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  PURCHASE: 'purchase',
  SETTINGS: 'settings',
  HISTORY: 'history',
};

export const storage = {
  get: async (key: string) => {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },
  set: async (key: string, value: unknown) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
};

export const getPurchaseKey = () => STORAGE_KEYS.PURCHASE;
export const getSettingsKey = () => STORAGE_KEYS.SETTINGS;
export const getHistoryKey = () => STORAGE_KEYS.HISTORY;
