import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';
import {ArrowRight, SaveIcon} from './icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  loading?: boolean;
  icon?: string | ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button = ({
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
}: ButtonProps) => {
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

    // If icon is a React Node (custom SVG component)
    if (icon && typeof icon !== 'string') {
      if (iconPosition === 'left') {
        return (
          <>
            {icon}
            <Text style={[getTextStyle(), styles.iconRight]}>{title}</Text>
          </>
        );
      }
      return (
        <>
          <Text style={[getTextStyle(), styles.iconLeft]}>{title}</Text>
          {icon}
        </>
      );
    }

    // If icon is a string (for backward compatibility)
    if (icon && typeof icon === 'string') {
      // For "arrow-right" icon, use our custom ArrowRight component
      if (icon === 'arrow-right') {
        return (
          <>
            <Text style={[getTextStyle(), styles.iconLeft]}>{title}</Text>
            <ArrowRight
              size={20}
              color={
                variant === 'primary' ? '#FFFFFF' : DesignSystem.colors.primary
              }
            />
          </>
        );
      }

      // For "content-save" icon, use our custom SaveIcon component
      if (icon === 'content-save') {
        return (
          <>
            <Text style={[getTextStyle(), styles.iconLeft]}>{title}</Text>
            <SaveIcon
              size={20}
              color={
                variant === 'primary' ? '#FFFFFF' : DesignSystem.colors.primary
              }
            />
          </>
        );
      }

      // For other icons, you can add more custom icon mappings here
      // or implement a more comprehensive solution

      // Default case: just show the text
      return <Text style={getTextStyle()}>{title}</Text>;
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
