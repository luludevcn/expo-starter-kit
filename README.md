# Expo Starter Kit

A reusable React Native / Expo template for building production-ready mobile apps quickly.

## Quick Start

```bash
# Clone the template
cp -r expo-starter-kit my-new-app
cd my-new-app

# Install dependencies
npm install

# Run development server
npx expo start
```

## Configuration

### 1. Update `app.config.ts`

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
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | No |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | No |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | No |
| `FIREBASE_APP_ID` | Firebase app ID | No |
| `FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | No |

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page
│   ├── settings.tsx       # Settings page
│   └── history.tsx        # History page
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── dev/           # Dev tools (DevMenu, ScreenshotCapture)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── hooks/             # Custom hooks
│   │   ├── useNotification.ts
│   │   ├── useTimer.ts
│   │   ├── usePurchase.ts
│   │   └── useStorage.ts
│   ├── stores/            # Zustand stores
│   │   ├── purchaseStore.ts
│   │   ├── settingsStore.ts
│   │   └── historyStore.ts
│   ├── theme/             # Theme configuration
│   │   ├── colors.ts
│   │   └── typography.ts
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── scripts/               # Build scripts
├── .github/workflows/     # GitHub Actions
├── eas.json              # EAS Build config
└── app.config.ts          # Expo config
```

## Development Tools

### Dev Menu (Shake to Open)

The template includes a development menu accessible by shaking your device:

- **Clear Storage** - Reset all AsyncStorage data
- **Simulate Purchase** - Toggle between Free/Pro status
- **Test Notification** - Send a test notification
- **Toggle Theme** - Cycle through system/light/dark modes
- **Toggle Notifications** - Enable/disable notifications

Usage in your app:

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

### Screenshot Capture

For capturing store screenshots:

```tsx
import { ScreenshotCapture } from './src/components/dev';

<ScreenshotCapture onScreenshot={(uri) => console.log(uri)} />;
```

Run the screenshot script:

```bash
node scripts/capture-screenshots.js
```

## Customization Guide

### Adding New Pages

```
app/about.tsx          → /about
app/profile.tsx        → /profile
app/(auth)/login.tsx   → /auth/login (with layout group)
```

### Adding Components

1. Create in `src/components/`
2. Export from `src/components/index.ts`

```tsx
// src/components/MyComponent.tsx
export function MyComponent() {
  return <View />;
}
```

### Adding Stores

```tsx
// src/stores/myStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMyStore = create()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    { name: 'my-store' }
  )
);
```

### Adding Hooks

```tsx
// src/hooks/useMyHook.ts
export function useMyHook() {
  // your hook logic
}
```

### Theme Configuration

Edit `src/theme/colors.ts` to customize colors:

```typescript
export const lightColors = {
  primary: '#007AFF',
  // ...
};

export const darkColors = {
  primary: '#0A84FF',
  // ...
};
```

## Available Scripts

```bash
npm start           # Start Expo dev server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
npm run build:android # Build Android (local)
eas build -p android # Build Android (EAS)
eas build -p ios     # Build iOS (EAS)
```

## GitHub Actions

The template includes CI/CD workflows for automatic builds.

### Required Secrets

Add these in GitHub repository Settings → Secrets:

- `EXPO_TOKEN` - Expo access token
- `EAS_BUILD_PROFILE` - EAS build profile (optional)

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| Build | Push to `main` | Builds Android APK + iOS |
| Lint | Every push | Runs ESLint + TypeScript |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Expo SDK 52 |
| Navigation | Expo Router v4 |
| State | Zustand + persist |
| Styling | NativeWind (Tailwind) |
| Storage | AsyncStorage |
| Notifications | expo-notifications |
| In-App Purchases | RevenueCat ready |
| Error Tracking | Sentry |
| Analytics | Firebase Analytics |
| Haptics | expo-haptics |

## License

MIT
