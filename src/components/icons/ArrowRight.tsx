import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from './IconBase';
import {DesignSystem} from '../../styles/designSystem';

interface ArrowRightProps extends IconBaseProps {
  // Any additional props specific to this icon
}

export const ArrowRight = ({
  size = 24,
  color = DesignSystem.colors.textPrimary,
  testID = 'arrow-right-icon',
  accessibilityLabel = 'Arrow right',
  ...props
}: ArrowRightProps) => {
  return (
    <IconBase
      size={size}
      color={color}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...props}>
      <Path
        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
        fill={color}
      />
    </IconBase>
  );
};
