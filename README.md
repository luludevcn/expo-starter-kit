# Expo Starter Kit

A reusable React Native / Expo template for building production-ready mobile apps quickly.

## ✨ Features

- **Modern Tech Stack**: Built on Expo SDK 55 + React Native 0.83
- **Declarative Routing**: Expo Router v55 for page navigation
- **State Management**: Zustand + AsyncStorage persistence
- **Styling System**: NativeWind (TailwindCSS 3)
- **Notification System**: expo-notifications integration
- **In-App Purchases**: RevenueCat ready
- **Error Tracking**: Sentry integration
- **Analytics**: Firebase Analytics ready
- **Developer Tools**: Dev menu, screenshot capture
- **CI/CD**: GitHub Actions for automated builds

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x
- Expo CLI (`npm install -g expo-cli`)

### Create a New Project

```bash
# Create with npx
npx create-expo-app@6.5.0 my-new-app --template https://github.com/yourusername/expo-starter-kit

# Or clone manually
git clone https://github.com/yourusername/expo-starter-kit.git my-new-app
cd my-new-app
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
# Start development server
npm start

# Start Android emulator
npm run android

# Start iOS simulator
npm run ios

# Start web version
npm run web
```

## ⚙️ Configuration

### 1. Update App Configuration

Edit `app.config.ts` to configure your app:

```typescript
{
  name: 'Your App Name',
  slug: 'your-app-slug',
  ios: {
    bundleIdentifier: 'com.yourcompany.yourapp',
  },
  android: {
    package: 'com.yourcompany.yourapp',
  },
}
```

### 2. Replace Assets

- `assets/icon.png` - App icon (1024x1024)
- `assets/splash.png` - Splash screen

### 3. Environment Variables

Copy the template file and configure your environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```bash
# Expo Configuration
EXPO_TOKEN=your_expo_token_here
EAS_PROJECT_ID=your_eas_project_id_here

# RevenueCat Configuration (for in-app purchases)
REVENUECAT_API_KEY=your_revenuecat_api_key_here
REVENUECAT_PRO_PRODUCT_ID=your_pro_product_id_here

# App Configuration
APP_NAME=Your App Name
APP_SLUG=your-app-slug
APP_VERSION=1.0.0

# Bundle Identifiers
IOS_BUNDLE_IDENTIFIER=com.yourcompany.yourapp
ANDROID_PACKAGE=com.yourcompany.yourapp

# Feature Flags
ENABLE_PURCHASES=false
ENABLE_NOTIFICATIONS=true
ENABLE_ANALYTICS=false
```

#### Environment Variable Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_TOKEN` | Expo access token for EAS builds | Yes |
| `EAS_PROJECT_ID` | EAS project ID | Yes |
| `REVENUECAT_API_KEY` | RevenueCat API key for in-app purchases | No |
| `REVENUECAT_PRO_PRODUCT_ID` | RevenueCat product ID for Pro subscription | No |
| `APP_NAME` | Display name of your app | No (defaults to "Expo Starter Kit") |
| `APP_SLUG` | Unique identifier for your app | No (defaults to "expo-starter-kit") |
| `APP_VERSION` | App version number | No (defaults to "1.0.0") |
| `IOS_BUNDLE_IDENTIFIER` | iOS bundle identifier | No (defaults to "com.starter.kitexpo") |
| `ANDROID_PACKAGE` | Android package name | No (defaults to "com.starter.kitexpo") |
| `ENABLE_PURCHASES` | Enable in-app purchase features | No (defaults to false) |
| `ENABLE_NOTIFICATIONS` | Enable push notifications | No (defaults to true) |
| `ENABLE_ANALYTICS` | Enable analytics features | No (defaults to false) |
| `SENTRY_DSN` | Sentry DSN for error tracking | No |
| `FIREBASE_API_KEY` | Firebase API key for analytics | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | No |

## 📁 Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout (theme, route config)
│   ├── index.tsx          # Home page (timer demo)
│   ├── settings.tsx       # Settings page
│   └── history.tsx        # History page
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── dev/           # Developer tools
│   │   │   ├── DevMenu.tsx        # Dev menu (shake to open)
│   │   │   ├── ScreenshotCapture.tsx  # Screenshot capture
│   │   │   └── index.ts
│   │   ├── Button.tsx     # Button component (multiple variants/sizes)
│   │   ├── Card.tsx       # Card component
│   │   ├── Spacer.tsx     # Spacer component
│   │   ├── TimerDisplay.tsx # Timer display component
│   │   └── index.ts
│   ├── hooks/             # Custom hooks
│   │   ├── useTimer.ts    # Timer hook
│   │   ├── useNotification.ts # Notification hook
│   │   ├── usePurchase.ts # In-app purchase hook
│   │   ├── useRevenueCat.ts # RevenueCat integration hook
│   │   ├── useAnalytics.ts # Analytics hook
│   │   ├── useStorage.ts  # Storage hook
│   │   └── index.ts
│   ├── stores/            # Zustand state management
│   │   ├── settingsStore.ts # Settings state
│   │   ├── purchaseStore.ts # Purchase state
│   │   ├── historyStore.ts  # History state
│   │   └── index.ts
│   ├── theme/             # Theme configuration
│   │   ├── colors.ts      # Color definitions (light/dark)
│   │   ├── typography.ts  # Typography styles
│   │   └── index.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── firebase.ts    # Firebase initialization
│   │   ├── sentry.ts      # Sentry initialization
│   │   ├── notifications.ts # Notification utilities
│   │   ├── storage.ts     # Storage utilities
│   │   ├── constants.ts   # Constants
│   │   ├── helpers.ts     # Helper functions
│   │   ├── init.ts        # App initialization
│   │   └── index.ts
│   └── index.css          # Global styles
├── scripts/               # Build scripts
│   └── capture-screenshots.js # Screenshot capture script
├── .github/workflows/     # GitHub Actions
│   └── build.yml          # Automated build workflow
├── eas.json              # EAS Build config
├── app.config.ts          # Expo config
└── tailwind.config.js     # TailwindCSS config
```

## 🎯 Core Features

### 1. Timer Functionality

The template includes a complete timer implementation:

```tsx
import { useTimer } from '../src/hooks';

const timer = useTimer({ 
  initialSeconds: 30, 
  autoStart: false,
  onComplete: () => console.log('Timer done!')
});

// Usage
timer.start();    // Start timer
timer.pause();    // Pause timer
timer.reset();    // Reset timer
timer.setTime(60); // Set time
```

### 2. Notification System

Supports scheduled reminders and immediate notifications:

```tsx
import { useNotification } from '../src/hooks';

const { 
  requestPermissions, 
  scheduleTimerReminder, 
  sendNotification 
} = useNotification();

// Request notification permissions
await requestPermissions();

// Send immediate notification
sendNotification('Title', 'Content');

// Schedule reminder (parking scenario example)
scheduleTimerReminder(30 * 60, 'timer-id');
```

### 3. Theme System

Supports three theme modes:

```tsx
import { useSettingsStore } from '../src/stores';

const { theme, setTheme } = useSettingsStore();

// Set theme
setTheme('system');  // Follow system
setTheme('light');   // Light mode
setTheme('dark');    // Dark mode
```

### 4. Developer Tools

#### Dev Menu (Shake to Open)

In development mode, shake your device to open the dev menu:

- **Clear Storage** - Reset all AsyncStorage data
- **Simulate Purchase** - Toggle between Free/Pro status
- **Test Notification** - Send a test notification
- **Toggle Theme** - Cycle through system/light/dark modes
- **Toggle Notifications** - Enable/disable notifications

```tsx
import { DevMenu } from './src/components/dev';

export default function App() {
  return (
    <DevMenu>
      {/* your app content */}
    </DevMenu>
  );
}
```

#### Screenshot Capture

For capturing store screenshots:

```tsx
import { ScreenshotCapture } from './src/components/dev';

<ScreenshotCapture onScreenshot={(uri) => console.log(uri)} />;
```

Run the screenshot script:

```bash
npm run screenshots
# or
node scripts/capture-screenshots.js
```

## 🛠️ Customization Guide

### Adding New Pages

Create new files in the `app/` directory:

```
app/about.tsx          → /about
app/profile.tsx        → /profile
app/(auth)/login.tsx   → /login (with layout group)
```

### Adding Components

1. Create in `src/components/`
2. Export from `src/components/index.ts`

```tsx
// src/components/MyComponent.tsx
export function MyComponent() {
  return <View className="p-4">
    <Text>My Component</Text>
  </View>;
}
```

### Adding Stores

```tsx
// src/stores/myStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMyStore = create()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    { name: 'my-store', storage: AsyncStorage }
  )
);
```

### Adding Hooks

```tsx
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export function useMyHook() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // initialization logic
  }, []);
  
  return { data, setData };
}
```

### Theme Configuration

Edit `src/theme/colors.ts` to customize colors:

```typescript
export const lightColors = {
  primary: '#007AFF',
  primaryDark: '#0066CC',
  secondary: '#5856D6',
  danger: '#FF3B30',
  success: '#34C759',
  // ...more colors
};

export const darkColors = {
  primary: '#0A84FF',
  primaryDark: '#0066CC',
  // ...more colors
};
```

## 📋 Available Scripts

```bash
npm start           # Start Expo dev server
npm run android     # Start Android emulator
npm run ios         # Start iOS simulator
npm run web         # Start web dev server
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript check
npm run prettier    # Format code
npm run prebuild    # Prebuild native projects
npm run build:android # Build Android (local)
npm run build:ios     # Build iOS (local)
npm run screenshots   # Run screenshot script
eas build -p android  # Build Android (EAS)
eas build -p ios      # Build iOS (EAS)
```

## 🔄 CI/CD Configuration

The template includes GitHub Actions for automated builds.

### Required Secrets

Add these in GitHub repository Settings → Secrets:

- `EXPO_TOKEN` - Expo access token
- `EAS_BUILD_PROFILE` - EAS build profile (optional)

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| Build | Push to `main` | Builds Android APK + iOS |
| Lint | Every push | Runs ESLint + TypeScript |

## 🛡️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Expo SDK | 55.x |
| Navigation | Expo Router | 55.x |
| State | Zustand | 5.x |
| Styling | NativeWind / TailwindCSS | 2.x / 3.x |
| Storage | AsyncStorage | 2.x |
| Notifications | expo-notifications | 55.x |
| In-App Purchases | RevenueCat | Ready |
| Error Tracking | Sentry | 7.x |
| Analytics | Firebase Analytics | 24.x |
| Haptics | expo-haptics | 55.x |
| Animation | react-native-reanimated | 4.x |

## 📱 Preview Pages

### Home Page (index.tsx)
- Timer demo component
- Navigation buttons to Settings and History pages

### Settings Page (settings.tsx)
- Purchase status display
- Notification toggle
- Theme switcher
- Data management (clear history, reset data)

### History Page (history.tsx)
- History records list
- Clear history functionality

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please submit issues and pull requests.

## 📧 Contact

For questions or suggestions, please contact:
- Submit GitHub Issue
- Send email to luludevcn@gmail.com
