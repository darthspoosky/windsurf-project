import React, { forwardRef } from 'react';
import { View, TextInputProps, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';

// Only include specific TextInputProps that are compatible with Paper's TextInput
interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
  style?: any; // Add style property
  label?: string;
  error?: string;
  className?: string; // Kept for backward compatibility
  inputClassName?: string; // Kept for backward compatibility
  labelClassName?: string; // Kept for backward compatibility
  errorClassName?: string; // Kept for backward compatibility
  mode?: 'flat' | 'outlined';
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const Input = forwardRef<any, InputProps>(({
  label,
  error,
  mode = 'outlined',
  left,
  right,
  // Ignored props for compatibility
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  style,
  ...props
}: InputProps, ref) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        label={label}
        mode={mode}
        error={!!error}
        left={left}
        right={right}
        style={[styles.input, style]}
        {...props}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default Input;
