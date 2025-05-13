import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface WashFrequencyIconProps extends IconBaseProps {}

export const WashFrequencyIcon: React.FC<WashFrequencyIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Wash frequency',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Shampoo bottle */}
      <Path
        d="M8 5H12V7C13.1046 7 14 7.89543 14 9V18C14 19.1046 13.1046 20 12 20H8C6.89543 20 6 19.1046 6 18V9C6 7.89543 6.89543 7 8 7V5Z"
        fill="#BBDEFB"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Bottle cap */}
      <Path d="M9 5H11V7H9V5Z" fill="#64B5F6" stroke={color} strokeWidth="1" />

      {/* Bubbles */}
      <Circle cx="10" cy="11" r="1" fill="#FFFFFF" />
      <Circle cx="12" cy="13" r="0.8" fill="#FFFFFF" />
      <Circle cx="8" cy="14" r="0.8" fill="#FFFFFF" />

      {/* Calendar/frequency indicator */}
      <Path d="M16 4H20V8H16V4Z" fill="none" stroke={color} strokeWidth="1.5" />
      <Path
        d="M17 6H19M18 5V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Repeat symbol */}
      <Path
        d="M16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M19 14L18 16L17 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};
