import { useState, useEffect, useRef, useCallback } from 'react';
import { useNotification } from './useNotification';

interface UseTimerOptions {
    initialSeconds?: number;
    autoStart?: boolean;
    onComplete?: () => void;
}

export function useTimer(options: UseTimerOptions = {}) {
    const { initialSeconds = 0, autoStart = false, onComplete } = options;
    const { sendNotification } = useNotification();

    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (isRunning && remainingSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setRemainingSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        sendNotification('Timer Complete', 'Your timer has finished!');
                        onCompleteRef.current?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, remainingSeconds, sendNotification]);

    const start = useCallback(() => {
        if (remainingSeconds > 0) setIsRunning(true);
    }, [remainingSeconds]);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback((seconds?: number) => {
        setIsRunning(false);
        setRemainingSeconds(seconds ?? initialSeconds);
    }, [initialSeconds]);

    const setTime = useCallback((seconds: number) => {
        setIsRunning(false);
        setRemainingSeconds(seconds);
    }, []);

    return {
        remainingSeconds,
        isRunning,
        start,
        pause,
        reset,
        setTime,
    };
}
