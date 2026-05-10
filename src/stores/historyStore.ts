import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../utils/helpers';
import type { HistoryItem } from '../types';

interface HistoryState {
  items: HistoryItem[];
  addItem: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  removeItem: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const newItem: HistoryItem = {
          ...item,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set({ items: [newItem, ...get().items] });
      },
      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
      clearHistory: () => set({ items: [] }),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
