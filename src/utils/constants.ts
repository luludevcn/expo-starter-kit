export const APP_NAME = 'Expo Starter Kit';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
    PURCHASE_STATUS: '@purchase_status',
    SETTINGS: '@settings',
    HISTORY: '@history',
    THEME: '@theme',
} as const;

export const DEFAULT_SETTINGS = {
    notificationsEnabled: true,
    theme: 'system' as const,
};

export const NOTIFICATION_CHANNELS = {
    TIMER: 'timer-notifications',
    REMINDER: 'reminder-notifications',
    PROMO: 'promo-notifications',
} as const;
