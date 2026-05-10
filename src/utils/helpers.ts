export function formatDate(date: Date | number | string): string {
    const d = typeof date === 'string' ? new Date(date) : (typeof date === 'number' ? new Date(date) : date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function formatTime(date: Date | number | string): string {
    const d = typeof date === 'string' ? new Date(date) : (typeof date === 'number' ? new Date(date) : date);
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDateTime(date: Date | number | string): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatDuration(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
