import type { ExpoConfig } from 'expo/config';

const defineConfig = (): ExpoConfig => ({
    name: 'Expo Starter Kit',
    slug: 'expo-starter-kit',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.starter.kitexpo',
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/icon.png',
            backgroundColor: '#ffffff',
        },
        package: 'com.starter.kitexpo',
    },
    web: {
        favicon: './assets/icon.png',
    },
    plugins: [
        'expo-router',
        [
            'expo-notifications',
            {
                icon: './assets/icon.png',
                color: '#ffffff',
            },
        ],
    ],
    extra: {
        eas: {
            projectId: 'your-project-id',
        },
    },
});

export default defineConfig;
