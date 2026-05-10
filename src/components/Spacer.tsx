import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function Spacer({ size = 'md', direction = 'vertical', className = '' }: SpacerProps) {
  const spacingMap = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };

  const spacing = typeof size === 'number' ? size : spacingMap[size];

  return (
    <View className={`${direction === 'horizontal' ? 'w-[spacing]' : 'h-[spacing]'} ${className}`} style={direction === 'horizontal' ? { width: spacing } : { height: spacing }} />
  );
}
