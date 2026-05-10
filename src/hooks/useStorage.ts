import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadValue = async () => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    setStoredValue(JSON.parse(value));
                }
            } catch (error) {
                console.error('Error loading from storage:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadValue();
    }, [key]);

    const setValue = useCallback(
        async (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error('Error saving to storage:', error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }, [key, initialValue]);

    return { storedValue, setValue, removeValue, isLoading };
}
