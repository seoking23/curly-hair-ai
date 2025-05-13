import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface SatinBonnetIconProps extends IconBaseProps {}

export const SatinBonnetIcon: React.FC<SatinBonnetIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Sleep with a satin/silk bonnet or pillowcase',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Pillow */}
      <Path
        d="M4 12C4 10.8954 4.89543 10 6 10H18C19.1046 10 20 10.8954 20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12Z"
        fill="#E0E0E0"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Pillow shine/satin effect */}
      <Path
        d="M7 13C7.5 14 9 15 12 15C15 15 16.5 14 17 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Bonnet */}
      <Path
        d="M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V10H8V8Z"
        fill="#F8BBD0"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Bonnet tie */}
      <Path
        d="M10 10V11M14 10V11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
