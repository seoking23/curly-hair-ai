import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from './IconBase';
import {DesignSystem} from '../../styles/designSystem';

interface CheckIconProps extends IconBaseProps {
  // Any additional props specific to this icon
}

export const CheckIcon = ({
  size = 24,
  color = DesignSystem.colors.textPrimary,
  testID = 'check-icon',
  accessibilityLabel = 'Check mark',
  ...props
}: CheckIconProps) => {
  return (
    <IconBase
      size={size}
      color={color}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...props}>
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill={color}
      />
    </IconBase>
  );
};
