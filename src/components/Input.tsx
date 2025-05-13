import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  testID?: string;
}

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  style,
  inputStyle,
  labelStyle,
  disabled = false,
  testID,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInputContainer,
          error ? styles.errorInputContainer : null,
          style || null,
        ]}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={DesignSystem.colors.textTertiary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          maxLength={maxLength}
          editable={!disabled}
          testID={testID}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={DesignSystem.colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignSystem.spacing.md,
  } as ViewStyle,
  label: {
    fontSize: DesignSystem.typography.fontSize.caption,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
    color: DesignSystem.colors.textSecondary,
    marginBottom: DesignSystem.spacing.xs,
  } as TextStyle,
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DesignSystem.colors.border,
    borderRadius: DesignSystem.borderRadius.md,
    backgroundColor: DesignSystem.colors.card,
  } as ViewStyle,
  focusedInputContainer: {
    borderColor: DesignSystem.colors.primary,
  } as ViewStyle,
  errorInputContainer: {
    borderColor: DesignSystem.colors.error,
  } as ViewStyle,
  input: {
    flex: 1,
    paddingVertical: DesignSystem.spacing.md,
    paddingHorizontal: DesignSystem.spacing.md,
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textPrimary,
  } as TextStyle,
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  } as ViewStyle,
  visibilityToggle: {
    padding: DesignSystem.spacing.md,
  } as ViewStyle,
  errorText: {
    fontSize: DesignSystem.typography.fontSize.small,
    color: DesignSystem.colors.error,
    marginTop: DesignSystem.spacing.xs,
  } as TextStyle,
});
