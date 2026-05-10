import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  textClassName = '',
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles = 'flex-row items-center justify-center rounded-xl border border-solid active:opacity-70';

  const variantStyles = {
    primary: isDisabled
      ? 'bg-gray-400 text-gray-200 border-gray-400'
      : 'bg-primary text-white border-primary hover:bg-primary-dark',
    secondary: isDisabled
      ? 'bg-gray-400 text-gray-200 border-gray-400'
      : 'bg-secondary text-white border-secondary hover:bg-secondary-dark',
    danger: isDisabled
      ? 'bg-gray-400 text-gray-200 border-gray-400'
      : 'bg-danger text-white border-danger hover:bg-danger-dark',
    outline: isDisabled
      ? 'bg-transparent text-gray-400 border-gray-400'
      : 'bg-transparent text-primary border-primary hover:bg-primary/10',
    ghost: isDisabled
      ? 'bg-transparent text-gray-400 border-transparent'
      : 'bg-transparent text-gray-900 border-transparent hover:bg-gray-100',
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={isDisabled ? '#A3A3A3' : '#FFFFFF'} size="small" />
      ) : (
        <Text className={`font-semibold ${textClassName}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
