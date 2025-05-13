import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface DetangleIconProps extends IconBaseProps {}

export const DetangleIcon: React.FC<DetangleIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Detangle with conditioner using wide-tooth comb',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Wide-tooth comb */}
      <Path
        d="M4 6H20V9H4V6Z"
        fill="#E0E0E0"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M6 9V16M9 9V18M12 9V16M15 9V18M18 9V16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Tangled hair */}
      <Path
        d="M5 5C5 5 7 3 9 4C11 5 10 7 12 7C14 7 13 5 15 4C17 3 19 5 19 5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Conditioner droplets */}
      <Path
        d="M7 4.5C7 4.5 7.5 4 8 4.5C8.5 5 8 5.5 8 5.5"
        stroke="#F8BBD0"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M11 3.5C11 3.5 11.5 3 12 3.5C12.5 4 12 4.5 12 4.5"
        stroke="#F8BBD0"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M16 4.5C16 4.5 16.5 4 17 4.5C17.5 5 17 5.5 17 5.5"
        stroke="#F8BBD0"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Smooth, detangled hair */}
      <Path
        d="M6 19C6 19 9 20 12 20C15 20 18 19 18 19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
