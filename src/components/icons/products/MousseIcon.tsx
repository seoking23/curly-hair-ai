import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface MousseIconProps extends IconBaseProps {}

export const MousseIcon: React.FC<MousseIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Mousse or volumizing product',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Mousse can */}
      <Path
        d="M8 7H16V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V7Z"
        fill="#BDBDBD"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Can top */}
      <Path
        d="M7 5H17V7H7V5Z"
        fill="#9E9E9E"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Nozzle */}
      <Path
        d="M11 3H13V5H11V3Z"
        fill="#757575"
        stroke={color}
        strokeWidth="1"
      />
      <Path
        d="M10 2H14V3H10V2Z"
        fill="#757575"
        stroke={color}
        strokeWidth="1"
      />

      {/* Foam/mousse */}
      <Circle
        cx="12"
        cy="9"
        r="1.5"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="0.5"
      />
      <Circle
        cx="10"
        cy="10"
        r="1"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="0.5"
      />
      <Circle
        cx="14"
        cy="10"
        r="1"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="0.5"
      />
      <Circle
        cx="11"
        cy="11"
        r="1"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="0.5"
      />
      <Circle
        cx="13"
        cy="11"
        r="1"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="0.5"
      />

      {/* Volume effect */}
      <Path
        d="M5 14C5 14 7 12 9 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M15 14C15 14 17 12 19 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M7 17C7 17 9 15 12 15C15 15 17 17 17 17"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Label */}
      <Path
        d="M10 13H14V17H10V13Z"
        fill="#F5F5F5"
        stroke={color}
        strokeWidth="0.5"
      />
      <Path
        d="M11 15H13"
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
