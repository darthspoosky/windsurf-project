import React from 'react';
import { ViewStyle, TextStyle, StyleSheet, View } from 'react-native';
import { Button as PaperButton, Text, useTheme } from 'react-native-paper';

interface ButtonProps {
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string; // Kept for backward compatibility
  textClassName?: string; // Kept for backward compatibility
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export const Button = ({
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
  icon,
  // Ignored props for compatibility
  className,
  textClassName,
}: ButtonProps) => {
  const theme = useTheme();
  
  // Map our custom variants to Paper button modes
  const getMode = (): 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'contained';
      case 'outline':
        return 'outlined';
      case 'ghost':
      case 'link':
        return 'text';
      default:
        return 'elevated';
    }
  };

  // Map our size values to styles
  const getSizeStyle = () => {
    const sizeStyles = {
      sm: { height: 32, paddingHorizontal: 8 },
      md: { height: 40, paddingHorizontal: 16 },
      lg: { height: 48, paddingHorizontal: 24 },
    };
    return sizeStyles[size];
  };

  // Get button color based on variant
  const getColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      default:
        return undefined; // Use default Paper theme colors
    }
  };

  // Handle string children or complex children differently
  const renderContent = () => {
    // If children is a string, wrap it in a Text component
    if (typeof children === 'string') {
      return (
        <Text 
          style={textStyle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {children}
        </Text>
      );
    }

    // If children is not a string (e.g., it's a component), return it as is
    return children;
  };

  return (
    <PaperButton
      mode={getMode()}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={icon}
      contentStyle={[getSizeStyle(), styles.contentStyle]}
      labelStyle={[styles.label, textStyle]}
      style={[styles.button, style]}
      buttonColor={getColor()}
    >
      {renderContent()}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '500',
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
