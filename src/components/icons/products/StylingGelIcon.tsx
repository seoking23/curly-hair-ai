import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface StylingGelIconProps extends IconBaseProps {}

export const StylingGelIcon: React.FC<StylingGelIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Styling gel',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Gel tub */}
      <Path
        d="M6 8H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V8Z"
        fill="#81D4FA"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Tub lid */}
      <Path
        d="M5 6H19V8H5V6Z"
        fill="#29B6F6"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M7 4H17V6H7V4Z"
        fill="#29B6F6"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Gel texture */}
      <Path
        d="M9 11C9 11 10 12 12 12C14 12 15 11 15 11"
        stroke="#E1F5FE"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M8 14C8 14 10 15 12 15C14 15 16 14 16 14"
        stroke="#E1F5FE"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Styled hair */}
      <Path
        d="M4 16C4 16 5 14 6 16C7 18 5 19 4 18"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M20 16C20 16 19 14 18 16C17 18 19 19 20 18"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Hold strength indicator */}
      <Circle cx="9" cy="18" r="0.5" fill="#FFFFFF" />
      <Circle cx="12" cy="18" r="0.5" fill="#FFFFFF" />
      <Circle cx="15" cy="18" r="0.5" fill="#FFFFFF" />
      <Path
        d="M9 18L15 18"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
