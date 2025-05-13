import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ShampooIconProps extends IconBaseProps {}

export const ShampooIcon: React.FC<ShampooIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Shampoo or clarifying shampoo',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Shampoo bottle */}
      <Path
        d="M8 4H16V7C16 7 17 8 17 9V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V9C7 8 8 7 8 7V4Z"
        fill="#90CAF9"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Bottle cap */}
      <Path
        d="M10 3H14V4H10V3Z"
        fill="#1976D2"
        stroke={color}
        strokeWidth="1"
      />

      {/* Bottle label */}
      <Path
        d="M9 10H15V16H9V10Z"
        fill="#E3F2FD"
        stroke={color}
        strokeWidth="0.75"
      />

      {/* Bubbles */}
      <Circle cx="10" cy="12" r="0.75" fill="#FFFFFF" />
      <Circle cx="12" cy="14" r="0.75" fill="#FFFFFF" />
      <Circle cx="14" cy="12" r="0.75" fill="#FFFFFF" />

      {/* Text on label (simplified) */}
      <Path
        d="M10 13H14"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <Path
        d="M11 11H13"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
