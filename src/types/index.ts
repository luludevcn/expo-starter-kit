export type ThemeMode = 'light' | 'dark' | 'system';

export interface HistoryItem {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
}

export interface TimerState {
    isRunning: boolean;
    remainingSeconds: number;
    totalSeconds: number;
}

export interface NotificationPayload {
    title: string;
    body: string;
    data?: Record<string, unknown>;
}
