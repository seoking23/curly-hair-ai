import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from './IconBase';
import {DesignSystem} from '../../styles/designSystem';

interface BackIconProps extends IconBaseProps {
  // Any additional props specific to this icon
}

export const BackIcon = ({
  size = 24,
  color = DesignSystem.colors.textPrimary,
  testID = 'back-icon',
  accessibilityLabel = 'Go back',
  ...props
}: BackIconProps) => {
  return (
    <IconBase
      size={size}
      color={color}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...props}>
      <Path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill={color}
      />
    </IconBase>
  );
};
