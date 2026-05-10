import React from 'react';
import { View, Text } from 'react-native';
import { formatDuration } from '../utils/helpers';

interface TimerDisplayProps {
  seconds: number;
  isRunning?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function TimerDisplay({ seconds, isRunning = false, size = 'medium' }: TimerDisplayProps) {
  const sizeStyles = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  };

  return (
    <View className="flex flex-col items-center justify-center">
      <Text className={`font-bold tabular-nums ${sizeStyles[size]} ${isRunning ? 'text-primary' : 'text-gray-900'}`}>
        {formatDuration(seconds)}
      </Text>
      {isRunning && <View className="w-2 h-2 rounded-full bg-success mt-2" />}
    </View>
  );
}
