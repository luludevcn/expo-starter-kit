import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode } from '../types';

interface SettingsState {
    notificationsEnabled: boolean;
    theme: ThemeMode;
    setNotificationsEnabled: (enabled: boolean) => void;
    setTheme: (theme: ThemeMode) => void;
    resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            notificationsEnabled: true,
            theme: 'system',
            setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
            setTheme: (theme) => set({ theme }),
            resetSettings: () => set({ notificationsEnabled: true, theme: 'system' }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
