import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';
import {BackArrow} from './icons/BackArrow';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  showBackButton?: boolean;
  testID?: string;
}

export const Header = ({
  title,
  subtitle,
  onBackPress,
  rightComponent,
  containerStyle,
  titleStyle,
  subtitleStyle,
  showBackButton = true,
  testID,
}: HeaderProps) => {
  return (
    <View
      style={[styles.container, containerStyle]}
      testID={testID}
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}>
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen">
            <BackArrow
              size={Platform.OS === 'ios' ? 32 : 24}
              color={DesignSystem.colors.textPrimary}
              testID={`${testID}-back-arrow`}
            />
          </TouchableOpacity>
        )}
        <View
          style={styles.titleContainer}
          accessible={true}
          accessibilityRole="text">
          <Text
            style={[styles.title, titleStyle]}
            accessibilityRole="header"
            accessibilityLabel={title}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, subtitleStyle]}
              accessibilityRole="text"
              accessibilityLabel={subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightComponent && (
        <View style={styles.rightSection}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DesignSystem.spacing.lg,
    paddingHorizontal: DesignSystem.spacing.lg,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: DesignSystem.spacing.md,
    minWidth: 44, // Minimum touch target size for accessibility
    minHeight: 44, // Minimum touch target size for accessibility
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: DesignSystem.typography.fontSize.heading3,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
  },
  subtitle: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
    marginTop: DesignSystem.spacing.xs,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
});
