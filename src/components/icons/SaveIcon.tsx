import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from './IconBase';
import {DesignSystem} from '../../styles/designSystem';

interface SaveIconProps extends IconBaseProps {
  // Any additional props specific to this icon
}

export const SaveIcon = ({
  size = 24,
  color = DesignSystem.colors.textPrimary,
  testID = 'save-icon',
  accessibilityLabel = 'Save',
  ...props
}: SaveIconProps) => {
  return (
    <IconBase
      size={size}
      color={color}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...props}>
      <Path
        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
        fill={color}
      />
    </IconBase>
  );
};
