import type { ExpoConfig } from 'expo/config';
import 'dotenv/config';

const defineConfig = (): ExpoConfig => ({
  name: process.env.APP_NAME || 'Expo Starter Kit',
  slug: process.env.APP_SLUG || 'expo-starter-kit',
  version: process.env.APP_VERSION || '1.0.0',
  scheme: 'expostarterkit',
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
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER || 'com.starter.kitexpo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    package: process.env.ANDROID_PACKAGE || 'com.starter.kitexpo',
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
    [
      '@react-native-firebase/app',
      {
        googleServicesFile: './google-services.json',
        iosGoogleServicesFile: './GoogleService-Info.plist',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID || 'your-project-id',
    },
    revenueCatApiKey: process.env.REVENUECAT_API_KEY,
    proProductId: process.env.REVENUECAT_PRO_PRODUCT_ID,
    enablePurchases: process.env.ENABLE_PURCHASES === 'true',
    enableNotifications: process.env.ENABLE_NOTIFICATIONS !== 'false',
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
    sentryDsn: process.env.SENTRY_DSN,
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  },
});

export default defineConfig;
