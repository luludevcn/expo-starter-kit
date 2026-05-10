import React, { useEffect } from 'react';
import * as ScreenCapture from 'expo-screen-capture';

interface ScreenshotCaptureProps {
  onScreenshot?: (uri: string) => void;
}

export function ScreenshotCapture({ onScreenshot }: ScreenshotCaptureProps) {
  useEffect(() => {
    const setupScreenshot = async () => {
      try {
        const hasPermission = await ScreenCapture.requestPermissionsAsync();
        if (hasPermission.granted) {
          const subscription = ScreenCapture.addScreenshotListener(() => {
            console.log('Screenshot taken');
            onScreenshot?.('');
          });
          return () => {
            subscription.remove();
          };
        }
      } catch (error) {
        console.warn('Screen capture not available:', error);
      }
    };

    const cleanup = setupScreenshot();
    return () => {
      cleanup?.then((fn) => fn?.());
    };
  }, [onScreenshot]);

  return null;
}

export async function captureScreen(label: string): Promise<string | null> {
  try {
    // takeScreenshotAsync may exist in newer versions of expo-screen-capture
    const result = await (ScreenCapture as any).takeScreenshotAsync?.();
    if (result) {
      console.log(`${label} captured:`, result.uri);
      return result.uri;
    }
    return null;
  } catch (error) {
    console.error('Screenshot failed:', error);
    return null;
  }
}
