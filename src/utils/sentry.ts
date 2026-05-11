import * as Sentry from '@sentry/react-native';

const SENTRY_DSN = process.env.SENTRY_DSN || '';

export function initSentry() {
  if (!SENTRY_DSN) {
    console.log('Sentry DSN not configured, skipping initialization');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    enabled: process.env.NODE_ENV !== 'development',
    tracesSampleRate: 0.5,
    debug: false,
  });
}

export { Sentry };
