import { useCallback } from 'react';
import analytics from '@react-native-firebase/analytics';

export function useAnalytics() {
  const logEvent = useCallback(
    async (name: string, parameters?: Record<string, unknown>) => {
      try {
        await analytics().logEvent(name, parameters);
        console.log(`Analytics event logged: ${name}`, parameters);
      } catch (error) {
        console.error('Analytics log event error:', error);
      }
    },
    []
  );

  const logScreenView = useCallback(
    async (screenName: string, screenClass?: string) => {
      try {
        await analytics().logScreenView({
          screen_name: screenName,
          screen_class: screenClass,
        });
        console.log(`Screen view logged: ${screenName}`);
      } catch (error) {
        console.error('Analytics screen view error:', error);
      }
    },
    []
  );

  const logPurchase = useCallback(
    async (productId: string, price: number, currency: string = 'USD') => {
      try {
        await analytics().logPurchase({
          currency,
          value: price,
          items: [
            {
              item_id: productId,
              item_name: productId,
              quantity: 1,
              price,
            },
          ],
        });
        console.log(`Purchase logged: ${productId} - $${price}`);
      } catch (error) {
        console.error('Analytics purchase error:', error);
      }
    },
    []
  );

  const logSignUp = useCallback(
    async (method: string = 'unknown') => {
      try {
        await analytics().logSignUp({ method });
        console.log(`Sign up logged: ${method}`);
      } catch (error) {
        console.error('Analytics sign up error:', error);
      }
    },
    []
  );

  const logLogin = useCallback(
    async (method: string = 'unknown') => {
      try {
        await analytics().logLogin({ method });
        console.log(`Login logged: ${method}`);
      } catch (error) {
        console.error('Analytics login error:', error);
      }
    },
    []
  );

  const setUserProperty = useCallback(
    async (name: string, value: string | number | boolean) => {
      try {
        await analytics().setUserProperty(name, String(value));
        console.log(`User property set: ${name} = ${value}`);
      } catch (error) {
        console.error('Analytics set user property error:', error);
      }
    },
    []
  );

  const setUserId = useCallback(async (userId: string) => {
    try {
      await analytics().setUserId(userId);
      console.log(`User ID set: ${userId}`);
    } catch (error) {
      console.error('Analytics set user ID error:', error);
    }
  }, []);

  const setAnalyticsCollectionEnabled = useCallback(
    async (enabled: boolean) => {
      try {
        await analytics().setAnalyticsCollectionEnabled(enabled);
        console.log(`Analytics collection ${enabled ? 'enabled' : 'disabled'}`);
      } catch (error) {
        console.error('Analytics set collection enabled error:', error);
      }
    },
    []
  );

  return {
    logEvent,
    logScreenView,
    logPurchase,
    logSignUp,
    logLogin,
    setUserProperty,
    setUserId,
    setAnalyticsCollectionEnabled,
  };
}
