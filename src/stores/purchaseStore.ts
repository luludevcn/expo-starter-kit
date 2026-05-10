import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PurchaseState {
    isPro: boolean;
    purchaseDate: string | null;
    unlockPro: () => void;
    lockPro: () => void;
    checkPurchaseStatus: () => void;
    resetPurchase: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
    persist(
        (set) => ({
            isPro: false,
            purchaseDate: null,
            unlockPro: () => set({ isPro: true, purchaseDate: new Date().toISOString() }),
            lockPro: () => set({ isPro: false, purchaseDate: null }),
            checkPurchaseStatus: () => {
                console.log('Checking purchase status');
            },
            resetPurchase: () => set({ isPro: false, purchaseDate: null }),
        }),
        {
            name: 'purchase-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
