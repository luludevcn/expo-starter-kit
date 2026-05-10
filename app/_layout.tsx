import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../src/stores';
import { useNotification } from '../src/hooks';
import { DevMenu } from '../src/components/dev';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { theme } = useSettingsStore();
    const { requestPermissions } = useNotification();

    useEffect(() => {
        if (theme === 'system') {
            requestPermissions();
        }
    }, [theme, requestPermissions]);

    const isDark = theme === 'system' ? colorScheme === 'dark' : theme === 'dark';

    return (
        <DevMenu>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
                    },
                    headerTintColor: isDark ? '#FFFFFF' : '#000000',
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: isDark ? '#000000' : '#F2F2F7',
                    },
                }}
            >
                <Stack.Screen name="index" options={{ title: 'Home' }} />
                <Stack.Screen name="settings" options={{ title: 'Settings' }} />
                <Stack.Screen name="history" options={{ title: 'History' }} />
            </Stack>
        </DevMenu>
    );
}
