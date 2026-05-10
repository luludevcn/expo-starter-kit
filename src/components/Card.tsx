import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({ children, className = '', padding = 'medium' }: CardProps) {
  const paddingStyles = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  return (
    <View className={`bg-white rounded-2xl shadow-sm shadow-black/10 elevation-3 ${paddingStyles[padding]} ${className}`}>
      {children}
    </View>
  );
}
