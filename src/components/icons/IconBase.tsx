import React from 'react';
import Svg, {SvgProps} from 'react-native-svg';
import {DesignSystem} from '../../styles/designSystem';

export interface IconBaseProps extends SvgProps {
  size?: number;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}

export const IconBase: React.FC<IconBaseProps> = ({
  size = 24,
  color = DesignSystem.colors.primary,
  testID,
  accessibilityLabel,
  children,
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      color={color}
      {...props}>
      {children}
    </Svg>
  );
};
