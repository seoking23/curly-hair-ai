import React, {ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {DesignSystem} from '../styles/designSystem';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  testID?: string;
}

export const Card = ({
  children,
  style,
  onPress,
  elevation = 'small',
  testID,
}: CardProps) => {
  const getShadowStyle = () => {
    switch (elevation) {
      case 'none':
        return {};
      case 'small':
        return DesignSystem.shadows.small;
      case 'medium':
        return DesignSystem.shadows.medium;
      case 'large':
        return DesignSystem.shadows.large;
    }
  };

  const cardStyle = [styles.card, getShadowStyle(), style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.8}
        testID={testID}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: DesignSystem.colors.card,
    borderRadius: DesignSystem.borderRadius.md,
    padding: DesignSystem.spacing.md,
    marginBottom: DesignSystem.spacing.md,
    borderWidth: 1,
    borderColor: DesignSystem.colors.border,
  },
});
