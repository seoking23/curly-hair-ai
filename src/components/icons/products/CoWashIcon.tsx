import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface CoWashIconProps extends IconBaseProps {}

export const CoWashIcon: React.FC<CoWashIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Co-wash or cleansing conditioner',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Co-wash bottle */}
      <Path
        d="M9 4H15V6C15 6 17 7 17 9V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V9C7 7 9 6 9 6V4Z"
        fill="#AED581"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Bottle cap */}
      <Path
        d="M10 3H14V4H10V3Z"
        fill="#689F38"
        stroke={color}
        strokeWidth="1"
      />

      {/* Bottle label */}
      <Path
        d="M9 10H15V16H9V10Z"
        fill="#F1F8E9"
        stroke={color}
        strokeWidth="0.75"
      />

      {/* Co-wash text */}
      <Path
        d="M10 12H14M10 14H14"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Water droplets */}
      <Circle cx="8" cy="8" r="0.5" fill="#81D4FA" />
      <Circle cx="16" cy="8" r="0.5" fill="#81D4FA" />

      {/* Hair strand */}
      <Path
        d="M4 12C4 12 5 13 7 13M20 12C20 12 19 13 17 13"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M4 16C4 16 6 18 12 18C18 18 20 16 20 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </IconBase>
  );
};
