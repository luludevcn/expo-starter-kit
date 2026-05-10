import { useCallback, useEffect } from 'react';
import { usePurchaseStore } from '../stores';

interface UsePurchaseOptions {
  productId?: string;
  onPurchaseSuccess?: () => void;
  onPurchaseError?: (error: Error) => void;
}

export function usePurchase(options: UsePurchaseOptions = {}) {
  const { productId, onPurchaseSuccess, onPurchaseError } = options;
  const { isPro: isPurchased, purchaseDate, unlockPro, lockPro, checkPurchaseStatus, resetPurchase } = usePurchaseStore();

  useEffect(() => {
    checkPurchaseStatus();
  }, [checkPurchaseStatus]);

  const purchase = useCallback(async () => {
    try {
      console.log('Purchase initiated for product:', productId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await unlockPro();
      onPurchaseSuccess?.();
    } catch (error) {
      onPurchaseError?.(error instanceof Error ? error : new Error('Purchase failed'));
    }
  }, [productId, unlockPro, onPurchaseSuccess, onPurchaseError]);

  const restore = useCallback(async () => {
    try {
      console.log('Restore purchases');
      await checkPurchaseStatus();
    } catch (error) {
      onPurchaseError?.(error instanceof Error ? error : new Error('Restore failed'));
    }
  }, [checkPurchaseStatus, onPurchaseError]);

  const unlock = useCallback(async () => {
    await unlockPro();
    onPurchaseSuccess?.();
  }, [unlockPro, onPurchaseSuccess]);

  return {
    isPurchased,
    purchaseDate,
    purchase,
    restore,
    unlock,
    resetPurchase,
  };
}
