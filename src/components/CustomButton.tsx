import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
}: CustomButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledSecondaryButton,
          style,
        ];
      case 'text':
        return [
          styles.textButton,
          disabled && styles.disabledTextButton,
          style,
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText, textStyle];
      case 'secondary':
        return [styles.buttonText, styles.secondaryButtonText, textStyle];
      case 'text':
        return [
          styles.buttonText,
          styles.textButtonText,
          disabled && styles.disabledTextButtonText,
          textStyle,
        ];
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? '#FFFFFF'
              : variant === 'secondary'
              ? DesignSystem.colors.primary
              : DesignSystem.colors.primary
          }
          size="small"
        />
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <View style={styles.iconLeft}>{icon}</View>
          <Text style={getTextStyle()}>{title}</Text>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <Text style={getTextStyle()}>{title}</Text>
          <View style={styles.iconRight}>{icon}</View>
        </>
      );
    }

    return <Text style={getTextStyle()}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button">
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: DesignSystem.borderRadius.pill,
    paddingVertical: DesignSystem.spacing.md,
    paddingHorizontal: DesignSystem.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: DesignSystem.colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: DesignSystem.colors.primary,
  },
  textButton: {
    paddingVertical: DesignSystem.spacing.sm,
    paddingHorizontal: DesignSystem.spacing.md,
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: DesignSystem.colors.primaryLight,
  },
  disabledSecondaryButton: {
    borderColor: DesignSystem.colors.primaryLight,
  },
  disabledTextButton: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: DesignSystem.typography.fontSize.body,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
    textAlign: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: DesignSystem.colors.primary,
  },
  textButtonText: {
    color: DesignSystem.colors.primary,
  },
  disabledTextButtonText: {
    color: DesignSystem.colors.textTertiary,
  },
  iconLeft: {
    marginRight: DesignSystem.spacing.sm,
  },
  iconRight: {
    marginLeft: DesignSystem.spacing.sm,
  },
});
