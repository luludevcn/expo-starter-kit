import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
};

export async function initFirebase() {
  if (isExpoGo) {
    console.log('Firebase not available in Expo Go, skipping initialization');
    return;
  }

  if (!firebaseConfig.apiKey) {
    console.log('Firebase API key not configured, skipping initialization');
    return;
  }

  try {
    const { initializeApp } = await import('@react-native-firebase/app');
    initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}
